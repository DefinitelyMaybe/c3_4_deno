import { Chart } from './core.js'

Chart.prototype.legend = function() {}
Chart.prototype.legend.show = function(targetIds) {
  var $$ = this.internal
  $$.showLegend($$.mapToTargetIds(targetIds))
  $$.updateAndRedraw({ withLegend: true })
}
Chart.prototype.legend.hide = function(targetIds) {
  var $$ = this.internal
  $$.hideLegend($$.mapToTargetIds(targetIds))
  $$.updateAndRedraw({ withLegend: false })
}
