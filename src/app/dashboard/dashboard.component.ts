import { Component, OnInit } from '@angular/core';

import { DadosService } from './dados.service';


// essa variavel e declarada para utilizar a API do google
declare var google: any;
/**
 *
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados : any;

  constructor(private dadosService: DadosService) {}

  ngOnInit() {
  	this.dadosService.obterDados().subscribe(
  		dados => {
  			this.dados = dados;
  			this.init();
  		});
  }

  /**
   * Inicializa a API de graficos com delay de 1 segundo
   * o que permite a itnregração da API com o Angular
   *
   * @return void
   */
  init(): void{

    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {'packages':['bar']});
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback( () =>
          {
          // Anonymous function that calls drawChart1 and drawChart2
            this.exibirGraficos();
          });
    }
  }



  /**
   * Call this method as soon as the Graphs API is initialized.
   * Responsible for calling graph generating methods
  */
   exibirGraficos(): void {
    this.exibirPieChart();
    // this.exibir3dPieChart();
    // this.exibirBarChart();
    // this.exibirLineChart();
    // this.exibirColumnChart();
    // this.exibirDonutChart();
  }

  /**
   * Exibe o gráfico Pie Chart.
   *
   * @return void
   */
  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');


    const chart = new google.visualization.PieChart(el);

    //draw e o comando da api do google que desenha
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }



  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definir os dados do gráfico.
   *
   * @return any
   */
  obterDataTable(): any {
  	const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   *
   * @return any
   */
  obterOpcoes(): any {
  	return {
    	'title': 'Quantidade de cadastros primeiro semestre',
        'width': 400,
        'height': 300
    };
  }

}
