import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  readonly dados = [
    ['Janeiro', 33],
    ['Fevereiro', 68],
    ['Março', 49],
    ['Abril', 15],
    ['Maio', 80],
    ['Junho', 27]
  ];

  constructor() { }

  /**
	 * Retorna um observable contendo os dados a serem
	 * exibidos no gráfico.
	 *
	 * @return Observable<any>
	 */
	obterDados(): Observable<any> {
		return new Observable(observable => {
      /*
      Um observable está sempre escutando, e o comando next é utilizado para
      notificar todos os inscritos no observable.
      */
      observable.next(this.dados);
      /*
      Quando um observable termina suas notificações ele envia uma notificação
      informando os inscritos que ele terminou e irá parar de escutar
      */
			observable.complete();
		});
	}
}
