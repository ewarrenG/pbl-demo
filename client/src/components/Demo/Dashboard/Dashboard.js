import $ from 'jquery';
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, CircularProgress, Card } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { LookerEmbedSDK } from '@looker/embed-sdk'
import CodeFlyout from '../CodeFlyout';
import useStyles from './styles.js';
import { EmbedHighlight } from '../../Highlights/Highlight'; //ooops
import AppContext from '../../../contexts/AppContext';
import FilterBar from './FilterBar';

const { validIdHelper } = require('../../../tools');

export default function Dashboard(props) {
  // console.log('Dashboard');

  const { staticContent: { lookerContent }, staticContent: { type } } = props;

  const { clientSession, codeShow, sdk, corsApiCall, atomTheme, isReady, selectedMenuItem } = useContext(AppContext)
  const { lookerUser, lookerHost } = clientSession;

  const demoComponentType = type || 'code flyout';
  const topBarBottomBarHeight = 112;

  const [value, setValue] = useState(0);
  const [iFrameExists, setIFrame] = useState(0);
  const [apiContent, setApiContent] = useState(undefined);
  const [dashboardObj, setDashboardObj] = useState({});
  // const [clientSideCode, setClientSideCode] = useState('');
  const [dashboardOptions, setDashboardOptions] = useState({});
  const [regionValue, setRegionValue] = useState('Pacific,South,Mountain,Midwest,Northeast');
  const [height, setHeight] = useState((window.innerHeight - topBarBottomBarHeight));
  const [tileToggleValue, setTileToggleValue] = useState('');
  const [visColorToggleValue, setVisColorToggleValue] = useState('#2d4266');
  const [lightThemeToggleValue, setLightThemeToggleValue] = useState(true);
  const [fontThemeSelectValue, setFontThemeSelectValue] = useState("arial");
  const [expansionPanelHeight, setExpansionPanelHeight] = useState(0);

  const isThemeableDashboard = validIdHelper(`${demoComponentType}${lookerContent[0].id}`) === 'customfilter1';
  const darkThemeBackgroundColor = "#343D4E";

  const classes = useStyles();

  //condtional theming for dark mode :D
  let paletteToUse = !lightThemeToggleValue && isThemeableDashboard ?
    {
      palette: {
        type: 'dark',
        background: { paper: darkThemeBackgroundColor, default: darkThemeBackgroundColor },
      }
    }
    :
    { palette: { ...atomTheme.palette } }

  const theme = React.useMemo(
    () =>
      createMuiTheme(
        paletteToUse
      ),
    [lightThemeToggleValue, lookerContent],
  );


  const handleTileToggle = (event, newValue) => {
    setTileToggleValue(newValue)
    const filteredLayout = _.filter(dashboardOptions.layouts[0].dashboard_layout_components, (row) => {
      return (lookerContent[0].dynamicFieldLookUp[newValue].indexOf(dashboardOptions.elements[row.dashboard_element_id].title) > -1)
    })

    const newDashboardLayout = {
      ...dashboardOptions.layouts[0],
      dashboard_layout_components: filteredLayout
    }
    dashboardObj.setOptions({ "layouts": [newDashboardLayout] })
  };

  const handleVisColorToggle = (event, newValue) => {
    let newColorSeries = lookerContent[0].dynamicVisConfig.colors[newValue];
    let newDashboardElements = { ...dashboardOptions.elements };
    Object.keys(newDashboardElements).map(key => {
      if (newDashboardElements[key].vis_config.series_colors) {
        Object.keys(newDashboardElements[key].vis_config.series_colors).map((innerKey, index) => {
          newDashboardElements[key].vis_config.series_colors[innerKey] = newColorSeries[index] || newColorSeries[0];
        })
      }

      if (newDashboardElements[key].vis_config.custom_color) {
        newDashboardElements[key].vis_config.custom_color = newColorSeries[0]
      }

      if (newDashboardElements[key].vis_config.map_value_colors) {
        newDashboardElements[key].vis_config.map_value_colors.map((item, index) => {
          newDashboardElements[key].vis_config.map_value_colors[index] = newColorSeries[index] || newColorSeries[0];
        })
      }

      // loss some fidelity here
      if (newDashboardElements[key].vis_config.series_cell_visualizations) {
        Object.keys(newDashboardElements[key].vis_config.series_cell_visualizations).map((innerKey, index) => {
          if (newDashboardElements[key].vis_config.series_cell_visualizations[innerKey].hasOwnProperty("palette")) {
            newDashboardElements[key].vis_config.series_cell_visualizations[innerKey]["palette"] = { ...lookerContent[0].dynamicVisConfig.series_cell_visualizations[newValue] }
          }
        })
      }


    })
    setVisColorToggleValue(newValue)
    dashboardObj.setOptions({ "elements": { ...newDashboardElements } })
  };

  const handleThemeChange = (event, newValue) => {
    let themeName = '';
    if (typeof newValue === "boolean") {//handleModeToggle
      setLightThemeToggleValue(newValue)
      themeName = newValue ? `light_${fontThemeSelectValue}` : `dark_${fontThemeSelectValue}`
    } else { //handleFontToggle
      themeName = lightThemeToggleValue ? `light_${newValue}` : `dark_${newValue}`
      setFontThemeSelectValue(newValue)
    }
    corsApiCall(performLookerApiCalls, [lookerContent, themeName])
  }

  useEffect(() => {
    if (isReady) {
      let themeName = lightThemeToggleValue ? 'light' : 'dark';
      themeName += `_${fontThemeSelectValue}`;
      corsApiCall(performLookerApiCalls, [[...lookerContent], themeName])
      // setClientSideCode(rawSampleCode)
    }
  }, [lookerUser, isReady, selectedMenuItem])


  useEffect(() => {
    if (Object.keys(dashboardOptions).length && Object.keys(dashboardObj).length && lookerContent[0].dynamicFieldLookUp) {
      handleTileToggle(null, tileToggleValue ? tileToggleValue : Object.keys(lookerContent[0].dynamicFieldLookUp)[0])
      handleVisColorToggle(null, visColorToggleValue ? visColorToggleValue : '#2d4266')
    }
  }, [dashboardOptions]);

  useEffect(() => {
    window.addEventListener("resize", () => setHeight((window.innerHeight - topBarBottomBarHeight)));
    setExpansionPanelHeight($('.MuiExpansionPanel-root:visible').innerHeight() || 0)
  })

  //componentDidMount
  useEffect(() => {
    setApiContent(undefined);
  }, [])


  const performLookerApiCalls = function (lookerContent, dynamicTheme) {

    setIFrame(0)
    $(`.embedContainer.${validIdHelper(demoComponentType)}:visible`).html('')
    lookerContent.map(async lookerContent => {
      //dashboard creation
      let dashboardId = lookerContent.id;
      let themeToUse = dynamicTheme && isThemeableDashboard ?
        dynamicTheme :
        lookerContent.theme ?
          lookerContent.theme :
          'atom_fashion';

      LookerEmbedSDK.createDashboardWithId(dashboardId) //dashboardSlug
        .appendTo(validIdHelper(`#embedContainer-${demoComponentType}-${dashboardId}`))
        .withClassName('iframe')
        .withNext()
        // .withNext(lookerContent.isNext || false) //how can I make this dynamic based on prop??
        .withTheme(themeToUse)
        .withParams({ 'schedule_modal': 'true' })
        .on('page:property:change', (event) => {
          // console.log('page property is changing!!!!')
          changeHeight(event)
        }) // dashboards-next
        .on('dashboard:loaded', (event) => {
          setDashboardOptions(event.dashboard.options)
        })
        // .on('drillmenu:click', (event) => {
        //   drillMenuClick(event)
        // })
        .build()
        .connect()
        .then((dashboard) => {
          setIFrame(1)
          setDashboardObj(dashboard)
          LookerEmbedSDK.init(`https://${lookerHost}.looker.com`);

        })
        .catch((error) => {
          // console.error('Connection error', error)
        })
      //additional api calls
      //only want to perform when there's not apiContent
      if (lookerContent.hasOwnProperty('filters') //&& !apiContent
      ) {
        // setApiContent(undefined)
        //get inline query from usecase file & set user attribute dynamically
        //iterating over filters
        let orderedArrayForApiContent = []
        lookerContent.filters.map(async (item, index) => {
          let jsonQuery = lookerContent.inlineQueries[index];
          jsonQuery.filters = {
            ...jsonQuery.filters,
            [item.desiredFilterName]: lookerUser.user_attributes.brand
          };

          let lookerResponseData = await sdk.ok(sdk.run_inline_query({ result_format: lookerContent.result_format || 'json', body: jsonQuery }));
          let queryResultsForDropdown = [];
          let desiredProperty = Object.keys(lookerResponseData[0])[0];

          for (let i = 0; i < lookerResponseData.length; i++) {
            queryResultsForDropdown.push({
              'label': lookerResponseData[i][desiredProperty],
              'trend': (lookerResponseData[i]['trend']) ? lookerResponseData[i]['trend'] : undefined
            })
          }

          orderedArrayForApiContent[index] = queryResultsForDropdown
          setApiContent([...orderedArrayForApiContent])
        })
      }

    })
  }

  const customFilterAction = (dashboardId, filterName, newFilterValue) => {
    if (Object.keys(dashboardObj).length) {
      dashboardObj.updateFilters({ [filterName]: newFilterValue })
      dashboardObj.run()
    }
  }

  // const drillMenuClick = (event) => {
  //   const basicLookerUser = lookerUser.user_attributes.permission_level === 'basic' ? true : false;
  //   if (basicLookerUser) {
  //     togglePayWallModal()
  //     return { cancel: (basicLookerUser) ? true : false }
  //   }
  // }

  const changeHeight = (event) => {
    // console.log('changeHeight')
    // console.log('event', event)
  }

  return (
    <div className={`${classes.root} demoComponent`}
      style={{ height }}
    >
      <ThemeProvider theme={theme}>
        <Card elevation={1} className={`${classes.padding30} ${classes.height100Percent}`}>
          <Grid container>
            <div
              className={`${classes.root}`}
            >
              {lookerContent[0].hasOwnProperty("filters") &&
                apiContent &&
                apiContent.length === lookerContent[0].filters.length ?
                <Grid item
                  sm={12}
                  key={validIdHelper(`${demoComponentType}-FilterBar-${lookerContent[0].id}`)}>
                  <FilterBar {...props}
                    classes={classes}
                    apiContent={apiContent}
                    customFilterAction={customFilterAction}
                    regionValue={regionValue}
                    setRegionValue={setRegionValue}
                    tileToggleValue={tileToggleValue}
                    handleTileToggle={handleTileToggle}
                    visColorToggleValue={visColorToggleValue}
                    handleVisColorToggle={handleVisColorToggle}
                    lightThemeToggleValue={lightThemeToggleValue}
                    fontThemeSelectValue={fontThemeSelectValue}
                    handleThemeChange={handleThemeChange}
                    isThemeableDashboard={isThemeableDashboard}
                  />
                </Grid> :
                lookerContent[0].hasOwnProperty("filters") ?
                  <Skeleton variant="rect" animation="wave" className={classes.skeleton} /> :
                  ''}
              {
                iFrameExists
                  ? ''
                  :
                  <Grid item sm={12} style={{ height: height - 30 - expansionPanelHeight }}>
                    <Card className={`${classes.card} ${classes.flexCentered}`}
                      elevation={0}
                      mt={2}
                      style={{ height: height - 30 - expansionPanelHeight }}>
                      <CircularProgress className={classes.circularProgress} />
                    </Card>
                  </Grid>
              }
              <Box
                className={iFrameExists ? ` ` : `${classes.hidden} `}
                style={{ height: height - 30 - expansionPanelHeight }}>
                <Grid container
                  spacing={3}
                  className={`${classes.noContainerScroll}`}>
                  {codeShow ?
                    <Grid item sm={6}
                      className={`${classes.positionFixedTopRight}`}
                    >
                      <CodeFlyout {...props}
                        classes={classes}
                        lookerUser={lookerUser}
                        height={height}
                      />
                    </Grid>
                    : ''}
                  <Grid item sm={12}>
                    <Box className={`${classes.w100} ${classes.padding10}`} mt={lookerContent[0].filter || lookerContent[0].dynamicFieldLookUp ? 2 : 0}>
                      <EmbedHighlight classes={classes}>
                        <div
                          className={`embedContainer ${validIdHelper(demoComponentType)}`}
                          id={validIdHelper(`embedContainer-${demoComponentType}-${lookerContent[0].id}`)}
                          key={validIdHelper(`embedContainer-${demoComponentType}-${lookerContent[0].id}`)}
                        >
                        </div>
                      </EmbedHighlight>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Card>
      </ThemeProvider>
    </ div>
  )
}