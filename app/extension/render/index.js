import { GanttRenderer, ganttType } from './Gantt';
import { BarChartRenderer, barchartType } from './BarChart';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(ganttType, GanttRenderer);
    formFields.register(barchartType, BarChartRenderer);
  }
}


export default {
  __init__: [ 'rangeField' ],
  rangeField: [ 'type', CustomFormFields ]
};