$(document).ready(function() {
    // 點擊 toggle 按鈕切換表格和高度
    function toggleTable(buttonId, tableId, divId) {
        $(buttonId).click(function() {
            $(tableId).toggle();
            var myDiv = document.getElementById(divId);
            var currentHeight = myDiv.style.maxHeight;
            if (currentHeight === "12vh") {
                myDiv.style.maxHeight = 70 + "vh";
            } else {
                myDiv.style.maxHeight = 12 + "vh";
            }
        });
    }

    toggleTable('#toggleButton1', '#bomTable', 'bomdiv');
    toggleTable('#toggleButton2', '#partTable', 'bomdiv2');

    // 點擊搜尋按鈕提交表單
    $('#searchButton').click(function() {
        $('#searchForm').submit();
    });

    // 處理匯出 CSV 按鈕點擊事件
    $('.export-csv-button').click(function() {
        var table = $(this).closest('.table');
        var rows = table.find('tr:has(td)').toArray().map(function(row) {
            return $(row).find('td').toArray().map(function(cell) {
                return $(cell).text().trim();
            }).join(',');
        }).join('\n');
        
        var header = table.find('th').toArray().map(function(cell) {
            return $(cell).text().trim();
        }).join(',');
        rows = header + '\n' + rows;

        var machineNumber = table.find('tr:eq(1) td:first-child').text().trim();
        var filenamePrefix = machineNumber + '_' + table.find('h2').text().trim();
        var filename = filenamePrefix + '.csv';

        var blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    });
});
