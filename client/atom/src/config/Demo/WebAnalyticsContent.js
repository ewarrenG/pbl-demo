import ShowChartIcon from '@material-ui/icons/ShowChart';
import { Dashboard } from '@pbl-demo/components';
import { EmbedHighlight, EmbedMethodHighlight } from '@pbl-demo/components/Accessories';
import { handleThemeChange } from '@pbl-demo/components/Dashboard/helpers'
import { SwitchTheme, CheckboxLabels, Dropdown, ChipList } from '@pbl-demo/components/Filters';
import { codeSandboxes } from '@pbl-demo/utils';
const { embedded_dashboard } = codeSandboxes

const themeFilter = {
  "label": "Show or hide native filters",
  "method": handleThemeChange,
  "methodName": "handleFiltersThemeChange",
  "component": SwitchTheme,
  "highlightComponent": EmbedHighlight,
  "gridWidth": 12,
  "options": { true: "Native filters", false: "Native filters" },
  "alwaysShow": true
}

const dateFilter = {
  "label": "Change date",
  "options": [
    { label: "last week", value: "last week" },
    { label: "last 2 weeks", value: "last 2 weeks" },
    { label: "last month", value: "last month" },
    { label: "last 3 months", value: "last 3 months" },
    { label: "last 6 months", value: "last 6 months" },
    { label: "last year", value: "last year" }
  ],
  "methodName": "handleDateChange",
  "tooltip": "Change date",
  "component": Dropdown,
  "highlightComponent": EmbedMethodHighlight,
  "gridWidth": 12,
  "filterName": "Date",
  "showOnlyCustomFilters": true,
}

const browserFilter = {
  "label": "Browser",
  "filterName": "Browser",
  "component": ChipList,
  "highlightComponent": EmbedMethodHighlight,
  "gridWidth": 12,
  "options": [
    { "value": "Chrome", "label": "Chrome", "color": "#DB4437" },
    { "value": "Firefox", "label": "Firefox", "color": "#ff9400" },
    { "value": "IE", "label": "IE", "color": "#0099ff" },
    { "value": "Other", "label": "Other" },
    { "value": "Safari", "label": "Safari", "color": "#0FB5EE" }
  ],
  "showOnlyCustomFilters": true
}
const trafficSourceFilter = {
  "label": "Traffic Source",
  "filterName": "Traffic Source",
  "component": CheckboxLabels,
  "highlightComponent": EmbedMethodHighlight,
  "gridWidth": 12,
  "options": [
    { "value": "Display", "label": "Display" },
    { "value": "Email", "label": "Email" },
    { "value": "Facebook", "label": "Facebook" },
    { "value": "Organic", "label": "Organic" },
    { "value": "Search", "label": "Search" },
  ],
  "showOnlyCustomFilters": true
}

export const WebAnalyticsContent = {
  "type": "simple dashboard",
  "label": "Web Analytics",
  "menuCategory": "marketing",
  "icon": ShowChartIcon,
  "description": "Overview of all your web traffic",
  "component": Dashboard,
  "thumbnail": {
    id: "9",
    url: "webanalytics"
  },
  "lookerContent": [
    {
      "type": "dashboard",
      "lookerMethod": "embedDashboard",
      "id": "9",
      "label": "Web Analytics",
      "isNext": false,
      "theme": "atom_light_arial_filters",
      "adjacentContainer": {
        "gridWidth": 2,
        "items": [themeFilter, browserFilter, dateFilter, trafficSourceFilter],
        "collapsable": true
      },
      "themeable": true,
      "allowNativeFilters": true,
    }
  ],
  "requiredPermissionLevel": 0,
  "codeFlyoutContent": [
    embedded_dashboard
  ]
}