import classNames from 'classnames';

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Default,
  Description,
  Label,
  Table
} from '@bpmn-io/form-js';

import {
  html,
  useContext
} from 'diagram-js/lib/ui';

import './styles.css';

import GanttIcon from './Gantt-chart-icon.svg';

export const ganttType = 'gantt';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function GanttRenderer(props) {

  const {
    errors = [],
    field
  } = props;

  const {
    description,
    id,
    label
  } = field;

  const { formId } = useContext(FormContext);

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  setTimeout(setGantt, 50, props, prefixId(id, formId));

  function setGantt(props, divSuffix) {

    let fieldName = props.field.dataSource.substring(1);
    let myMap = new Map(Object.entries(props.value));
    let tasks = myMap.get(fieldName);

    let divId = '#gantt-' + divSuffix;

    console.log('divId is ' + divId);

      let gantt = new Gantt(divId, tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: [ "Quarter Day", "Half Day", "Day", "Week", "Month" ],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        language: "en", // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
        custom_popup_html: null,
      });
  }

  /* We use `htm` to
  * to render our components without the need of extra JSX transpilation.

   */

  return html`
      <head>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/frappe-gantt/0.6.1/frappe-gantt.min.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/frappe-gantt/0.6.1/frappe-gantt.css"></script>

          <script type="text/javascript">
              ${setTimeout}
          </script>
      </head>
      <body>
      <${ Label } htmlFor=${ prefixId(id) } label=${ label } />
      <div id="gantt-${prefixId(id, formId)}"></div>
      </body>`;
}


/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
GanttRenderer.config = {

  /* we can extend the default configuration of existing fields */
  ...Table.config,
  type: ganttType,
  label: 'Gantt chart',
  group: 'presentation',
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(GanttIcon) }`,
  propertiesPanelEntries: [
    'field',
    'label',
    'description',
    'dataSource'
  ]
};

// helper //////////////////////
function formFieldClasses(type, { errors = [] } = {}) {
  if (!type) {
    throw new Error('type required');
  }

  return classNames('fjs-form-field', `fjs-form-field-${type}`, {
    'fjs-has-errors': errors.length > 0
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${ formId }-${ id }`;
  }

  return `fjs-form-${ id }`;
}