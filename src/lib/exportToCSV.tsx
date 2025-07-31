function convertToCSV(arr) {
  if (arr.length === 0) return '';

  const headers = Object.keys(arr[0]).join(',') + '\n';
  const rows = arr.map(obj => Object.values(obj).join(',')).join('\n');

  return headers + rows;
}


export function downloadCSV(data, filename = 'export.csv') {
    const csvString=convertToCSV(data);
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
