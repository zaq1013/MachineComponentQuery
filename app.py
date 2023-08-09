from flask import Flask, render_template, request, make_response
import pyodbc
import csv
import io

app = Flask(__name__)

server = '77.0.0.151'
database = 'plQuote_train'
username = 'plis'
password = 'spl_20765242'

@app.route('/', methods=['GET', 'POST'])
def index():
    query_results = []
    show_result_table = False  # 新增一個變數來判斷是否顯示查詢結果的表格

    if request.method == 'POST':
        machine_number = request.form.get('machine_number', '')
        model = request.form.get('model', '')
        size = request.form.get('size', '')
        feeder = request.form.get('feeder', '')
        connection = pyodbc.connect(f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server};DATABASE={database};UID={username};PWD={password}')
        cursor = connection.cursor()

        query = f"SELECT Xsom_cust as 客戶ID, Xsom_bill as 代理, Xsom_nbr as 訂單號碼, Xsom_code as 機號, Xsom_part as 機台料號, Xsom_cmmt as 機種, Xsom_inch as 尺吋, Xsom__chr01 as 工單ID, Xsom_cust_name as 客戶Name, Xsom_slspsn as 業務員, Xsom_acsh_date as 出貨日期, Xsom_desc1 as 說明一, xsom_feeder as 口數 FROM Xsom_refMC WHERE Xsom_code LIKE '%{machine_number}%' AND Xsom_cmmt LIKE '%{model}%' AND Xsom_inch LIKE '%{size}%' AND xsom_feeder like '%{feeder}%'"
        cursor.execute(query)
        query_results = cursor.fetchall()
        connection.close()

        show_result_table = True  # 如果進行過查詢，則設置為 True

    return render_template('index.html', query_results=query_results, show_result_table=show_result_table)


@app.route('/component/<machine_number>', methods=['GET', 'POST'])
def component(machine_number):
    bom_rows = []
    part_rows = []

    if request.method == 'POST':
        machine_number = request.form.get("machine_number")

    connection = pyodbc.connect(f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server};DATABASE={database};UID={username};PWD={password}')
    cursor = connection.cursor()

    query = f"SELECT * FROM sbom_det WHERE sbom_code = '{machine_number}'"
    cursor.execute(query)
    data = cursor.fetchall()

    for row in data:
        if row.sbom_code_par is None:
            bom_rows.append(row)
        else:
            part_rows.append(row)

    connection.close()

    return render_template('index2.html', bom_rows=bom_rows, part_rows=part_rows, machine_number=machine_number)


if __name__ == '__main__':
    app.run(debug=True)
