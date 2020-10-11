import { Chart } from './core.js'
import { isUndefined } from './util.js'

Chart.prototype.groups = function(groups) {
  var $$ = this.internal,
    config = $$.config
  if (isUndefined(groups)) {
    return config.data_groups
  }
  config.data_groups = groups
  $$.redraw()
  return config.data_groups
}
