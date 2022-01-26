import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const redPrimary = red[500];
const greenPrimary = green[500];
const redLight = red[100];
const greenLight = green[100];

export const topBarBottomBarHeight = 140;
export const additionalHeightForFlyout = 15; //hack for now

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'scroll',
    borderRadius: 8
  },
  flexCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    visibility: 'hidden',
    position: 'absolute', //hack for obscuring other elements within Box
    zIndex: -1
  },
  tabs: {
    backgroundColor: 'white',
    color: '#6c757d'
  },
  dNone: {
    display: 'none'
  },
  dBlock: {
    display: 'block'
  },
  tree: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  icon: {
    marginRight: 12,
    fontSize: '1rem',
    overflow: 'visible'
  },
  mt12: {
    marginTop: 12
  },
  w100: {
    width: '100%'
  },
  mlAuto: {
    marginLeft: 'auto'
  },
  mrAuto: {
    marginRight: 'auto'
  },
  skeleton: {
    minWidth: 275,
    minHeight: 600,
  },
  card: {
    minWidth: 275,
  },
  padding30: {
    padding: 30
  },
  minHeight680: {
    minHeight: 680,
  },
  maxHeight200: {
    maxHeight: 200,
    height: 200,
    overflow: 'hidden'
  },
  mt30: {
    marginTop: 30
  },
  mb30: {
    marginBottom: 30
  },
  textCenter: {
    textAlign: 'center'
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  border: {
    border: '1px solid black'
  },
  height800: {
    height: 800
  },
  maxHeight100: {
    maxHeight: 100,
    height: 100,
  },
  maxHeight400: {
    maxHeight: 400,
    height: 400,
  },
  minHeight200: {
    minHeight: 200,
    overflow: 'scroll'
  },
  redNeg: {
    backgroundColor: redLight,
    color: redPrimary,
    fontWeight: 800
  },
  greenPos: {
    backgroundColor: greenLight,
    color: greenPrimary,
    fontWeight: 800
  },
  padding30: {
    padding: 30
  },
  mb12: {
    marginBottom: 12
  },
  overflowScroll: {
    overflow: 'scroll'
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  overflowVisible: {
    overflow: 'visible'
  },
  maxHeight150: {
    maxHeight: 150,
    height: 150,
  },
  minHeight150: {
    minHeight: 150,
    overflow: 'scroll'
  },
  carouselLegend: {
    backgroundColor: 'rgb(192,192,192, .5)	 !important',
    textAlign: 'center !important',
    opacity: `100 !important`,
    fontWeight: 800,
    // width: `${25}% !important`,
  },
  carouselLegendTitle: {
    fontSize: '24px !important',

  },
  carouselLegendBody: {
    fontSize: '16px !important',
  },
  padding15: {
    padding: 15
  },
  maxHeight75: {
    maxHeight: 75,
    height: 75,
  },
  overflowYScroll: {
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  padding20: {
    padding: 20
  },
  codeFlyoutContainer: {
    overflow: 'scroll',
    borderRadius: '0 8px 8px 0',
    backgroundColor: "#ffffff", //`rgb(240, 240, 240)`
    padding: "1rem 1.5rem",
    position: 'fixed',
    right: '0',
    top: '4.5rem',
    height: 'calc(100vh - 4.5rem)',
    zIndex: 1202,
    boxShadow: "-4px 4px 6px 3px rgba(0, 0, 0, 0.13)"
  },
  height100Percent: {
    height: '100%'
  },
  noContainerScroll: {
    width: '100%',
    margin: 0
  },
  maxHeight60: {
    maxHeight: 60,
    height: 60,
  },
  maxHeight350: {
    maxHeight: 350,
    height: 350,
  },
  maxHeight80Percent: {
    maxHeight: '80%',
    height: '80%'
  },
  faSm: {
    fontSize: '.75em'
  },
  mr12: {
    marginRight: 12
  },
  ml12: {
    marginLeft: 12
  },
  dot: {
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    display: "inline-block"
  },
  borderRadius0: { borderRadius: 0 },
  w33: {
    width: "33%"
  },
  verticalAlignTop: {
    verticalAlign: 'top'
  },
  padding10: {
    padding: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  bluePrimary: {
    backgroundColor: 'rgba(69, 149, 236, 1)'
  },
  blueSecondary: {
    backgroundColor: 'rgba(69, 149, 236, .5)',
  },
  orangePrimary: {
    backgroundColor: 'rgba(243, 167, 89, 1)'
  },
  orangeSecondary: {
    backgroundColor: 'rgba(243, 167, 89, .5)'
  },
  bottomBarSpacer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  maxHeight600: {
    maxHeight: 600,
    overflow: 'scroll'
  },
  m12: {
    margin: 12
  },
  m6: {
    margin: 6
  },
  positionTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
  },
  positionRelative: {
    position: 'relative'
  }
}));