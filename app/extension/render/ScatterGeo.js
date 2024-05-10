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

import Plotly from './ploty.min.js';

import ScatterGeoIcon from './globe.svg';

export const scattergeoType = 'scattergeo';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function ScatterGeoRenderer(props) {

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

  setTimeout(setScatterGeo, 50, props, prefixId(id, formId));

  function setScatterGeo(props, divSuffix) {

    // Put code here

    console.log('datasource is ' + JSON.stringify(props));

    let myMap = new Map(Object.entries(props.value));
    let fieldId = props.field.id;
    console.log('FieldId is ' + JSON.stringify(props.field.id));
    let ref = myMap.get(fieldId);
    console.log('Ref is ' + ref);

    fetch('http://localhost:3000/camundi/' + ref)
      .then(response => response.json())
      .then(data => {
        let layout = {
          title: data.title,
          geo: {
            scope: 'world'
          }
        };

        console.log('Data is ' + data);
        console.log('Chart value is ' + data.chartValue);

        let chartVal = data.chartValue;

        console.log('Chart value redux is ' + JSON.stringify(chartVal));

        let divId = 'scattergeo-' + divSuffix;

        let config = { responsive: true };

        Plotly.newPlot(divId, chartVal, layout, config);
      });

  }

  /* We use `htm` to
  * to render our components without the need of extra JSX transpilation.

   */

  return html`
      <head>
          <!-- script src='https://cdn.plot.ly/plotly-2.31.1.min.js'></script -->

          <script type="text/javascript">
              ${setTimeout}
          </script>
      </head>
      <body>
        <${ Label } htmlFor=${ prefixId(id) } label=${ label } />
        <div id="scattergeo-${prefixId(id, formId)}"></div>
      </body>`;
}


/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
ScatterGeoRenderer.config = {

  /* we can extend the default configuration of existing fields */
  ...Table.config,
  type: scattergeoType,
  label: 'World Map',
  group: 'presentation',
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(ScatterGeoIcon) }`,
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