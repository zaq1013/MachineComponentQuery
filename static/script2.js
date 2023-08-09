$(document).ready(function() {
    $('#toggleButton1').click(function() {
        $('#bomTable').toggle();
        var myDiv = document.getElementById("bomdiv");
        var currentHeight = myDiv.style.maxHeight;
        if (currentHeight == "12vh")
        {
            myDiv.style.maxHeight = 70 + "vh";
        }
        else{
            myDiv.style.maxHeight = 12 + "vh";
        }
        
    });
    
});
$(document).ready(function() {
    $('#toggleButton2').click(function() {
        $('#partTable').toggle();
        var myDiv2 = document.getElementById("bomdiv2");
        var currentHeight2 = myDiv2.style.maxHeight;
        if (currentHeight2 == "12vh")
        {
            myDiv2.style.maxHeight = 70 + "vh";
        }
        else{
            myDiv2.style.maxHeight = 12 + "vh";
        }
    });
});

$(document).ready(function() {
    $('#searchButton').click(function() {
        $('#searchForm').submit();
    });
});

// 处理导出 CSV 按钮点击事件
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





