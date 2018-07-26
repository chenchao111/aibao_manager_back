import { export_json_to_excel } from '@/vendor/Export2Excel'

function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
    return v[j]
  }))
}
export function exportDataToExcel(options) {
  const _default = {
    tHeader: [],
    filterVal: [],
    data: [],
    fileName: 'aibao-list'
  }
  for (var attr in options) {
    if (options.hasOwnProperty(attr)) {
      _default[attr] = options[attr]
    }
  }
  const data = formatJson(_default.filterVal, _default.data)
  export_json_to_excel(_default.tHeader, data, _default.fileName)
}
