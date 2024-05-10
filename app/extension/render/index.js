import { GanttRenderer, ganttType } from './Gantt';
import { BarChartRenderer, barchartType } from './BarChart';
import { ScatterGeoRenderer, scattergeoType } from './ScatterGeo';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(ganttType, GanttRenderer);
    formFields.register(barchartType, BarChartRenderer);
    formFields.register(scattergeoType, ScatterGeoRenderer);
  }
}


export default {
  __init__: [ 'rangeField' ],
  rangeField: [ 'type', CustomFormFields ]
};