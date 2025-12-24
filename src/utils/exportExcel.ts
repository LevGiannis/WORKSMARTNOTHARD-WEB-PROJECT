// Utility for exporting eco-friendly Excel (XLSX) files


// Static import for portable build compatibility
import * as XLSX from 'xlsx';

export function exportEcoFriendlyExcel({
  data,
  filename = 'report.xlsx',
  sheetName = 'Αναφορά',
  headers = [],
  greenHeader = true
}: {
  data: any[],
  filename?: string,
  sheetName?: string,
  headers?: string[],
  greenHeader?: boolean
}) {
  // Prepare worksheet data
  const wsData = [headers.length ? headers : Object.keys(data[0]||{})]
  for(const row of data) {
    wsData.push(headers.length ? headers.map(h => row[h]) : Object.values(row))
  }
  const ws = XLSX.utils.aoa_to_sheet(wsData)

  // Formatting: auto column width, borders, alignment, bold header, green header, greek formats
  if(ws['!ref']) {
    const range = XLSX.utils.decode_range(ws['!ref'])
    // Υπολογισμός αυτόματου πλάτους στηλών
    const colWidths = []
    for(let C = range.s.c; C <= range.e.c; ++C) {
      let maxLen = 10
      for(let R = range.s.r; R <= range.e.r; ++R) {
        const cell = ws[XLSX.utils.encode_cell({r:R, c:C})]
        let v = cell && cell.v ? String(cell.v) : ''
        if(v.length > maxLen) maxLen = v.length
      }
      colWidths.push({ wch: maxLen + 2 })
    }
    ws['!cols'] = colWidths

    // Εφαρμογή μορφοποίησης σε όλα τα κελιά
    for(let R = range.s.r; R <= range.e.r; ++R) {
      for(let C = range.s.c; C <= range.e.c; ++C) {
        const cell = ws[XLSX.utils.encode_cell({r:R, c:C})]
        if(cell) {
          // Header row
          if(R === 0) {
            cell.s = {
              fill: greenHeader ? { fgColor: { rgb: 'C6EFCE' } } : undefined,
              font: { bold: true, color: { rgb: greenHeader ? '006100' : '000000' } },
              alignment: { horizontal: 'center', vertical: 'center' },
              border: {
                top: { style: 'thin', color: { rgb: 'A0A0A0' } },
                left: { style: 'thin', color: { rgb: 'A0A0A0' } },
                right: { style: 'thin', color: { rgb: 'A0A0A0' } },
                bottom: { style: 'thin', color: { rgb: 'A0A0A0' } }
              }
            }
          } else {
            // Data rows
            cell.s = {
              alignment: { horizontal: 'center', vertical: 'center' },
              border: {
                top: { style: 'thin', color: { rgb: 'D0D0D0' } },
                left: { style: 'thin', color: { rgb: 'D0D0D0' } },
                right: { style: 'thin', color: { rgb: 'D0D0D0' } },
                bottom: { style: 'thin', color: { rgb: 'D0D0D0' } }
              }
            }
            // Ελληνικό format ημερομηνίας
            if(cell.v && typeof cell.v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(cell.v)) {
              cell.z = 'DD/MM/YYYY'
            }
            // Αριθμοί με ελληνικό format
            if(typeof cell.v === 'number') {
              cell.z = '#,##0.00'
            }
          }
        }
      }
    }
    ws['!rows'] = [{ hpt: 22 }]
  }

  // Create workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName)

  // Write and trigger download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true })
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
