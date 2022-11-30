function MM_openBrWindow(theURL,winName,features) { //v2.0
	window.open(theURL,winName,features);
}

function expande(quem, hosp)
{
	if(quem.checked==true)
	abre_setor(hosp);
	else
	document.getElementById("pacientes_lista").innerHTML='';
}
function abre_setor(valor)
{
	req = null;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="atualiza" e insere o conteudo
					// retornado nela, como texto HTML
					document.getElementById('setores'+valor).innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", "carrega_setores.php?hosp="+valor, true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				// apenas quando o estado for "completado"
				if (req.readyState == 4) {
					// apenas se o servidor retornar "OK"
					if (req.status == 200) {
						// procura pela div id="atualiza" e insere o conteudo
						// retornado nela, como texto HTML
						document.getElementById('setores'+valor).innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", "carrega_setores.php?hosp="+valor, true);
			req.send();
		}
	}

}


// (Yuri - 10/05/06) Exibe uma barra de progresso informando q os DCMs est�o sendo criados ou remove a barra
function avisoDcms(mostrar) {

	var html = "&nbsp;<img src=\"imagens/progresso.gif\" height=\"20\"";
	if (mostrar=="nao") {
		html += "width=\"0\"";
	}
	html += ">";
	//alert (html);
	document.getElementById("aviso").innerHTML = html;
}

var req;
function abre_pacientes(valor_nome)
{
	req = null;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="atualiza" e insere o conteudo
					// retornado nela, como texto HTML
					document.getElementById("pacientes_lista").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", "carrega_pacientes.php?search_nome="+valor_nome, true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				// apenas quando o estado for "completado"
				if (req.readyState == 4) {
					// apenas se o servidor retornar "OK"
					if (req.status == 200) {
						// procura pela div id="atualiza" e insere o conteudo
						// retornado nela, como texto HTML
						document.getElementById("pacientes_lista").innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", "carrega_pacientes.php?search_nome="+valor_nome, true);
			req.send();
		}
	}
}


function detalhar(prontuario)
{
	req = null;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="atualiza" e insere o conteudo
					// retornado nela, como texto HTML
					document.getElementById("paciente_detalhes").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", "detalha_paciente.php?prontuario="+prontuario, true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				// apenas quando o estado for "completado"
				if (req.readyState == 4) {
					// apenas se o servidor retornar "OK"
					if (req.status == 200) {
						// procura pela div id="atualiza" e insere o conteudo
						// retornado nela, como texto HTML
						document.getElementById("paciente_detalhes").innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", "detalha_paciente.php?prontuario="+prontuario, true);
			req.send();
		}
	}
}

function habilita_radio()
{
	var check=0;
	with(document.form)
	{
		for(i=0;i<elements.length;i++)
		{
			if ((elements[i].type=="radio") && (elements[i].checked==true))
			check++;
			if (check==0)
			selecionar_paciente.disabled=true;
			else
			selecionar_paciente.disabled=false;
		}
	}
}

function submit_login()
{
	if (document.implogin.login.value == "") {
		alert('Por favor, informe seu nome de usu�rio.');
		document.implogin.login.focus();
		return false;
	} else if (document.implogin.pass.value == "") {
		alert('Por favor, informe sua senha.');
		document.implogin.pass.focus();
		return false;
	} else {
		return true;
	}
}

function listagem(dataInicio, dataFim, executor, order, pgM, pgL) {

	/*
	# par�metros #
	dataInicio <= "per�odo dos laudos" >= dataFim
	executor: m�dico q emitiu o laudo
	order: ordena��o, tanto para os m�dicos (url com "order" mas sem "executor") qto para os laudos
	pgM: p�gina corrente na listagem de m�dicos
	pgL: p�gina corrente na listagem de laudos
	*/

	var url;
	var req;
	req = null;

	// forma a URL, dependendo dos par�metros que foram passados
	url = "listagem.ajax.php?dataInicio="+dataInicio+"&dataFim="+dataFim;
	if (executor!=null) url = url+"&executor="+executor;
	if (order!=null) url = url+"&order="+order;
	if (pgM!=null) url = url+"&pgM="+pgM;
	if (pgL!=null) url = url+"&pgL="+pgL;

	// procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {

		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="medicos_laudos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("medicos_laudos").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}
		req.open("GET", url, true);
		req.send(null);

		// procura por uma vers�o ActiveX (IE)
	} else if (window.ActiveXObject) {

		req = new ActiveXObject("Microsoft.XMLHTTP");
		req.onreadystatechange = function()	{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="medicos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("medicos_laudos").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}
		req.open("GET", url, true);
		req.send();
	}
}

function listagem_oculta(dataInicio, dataFim, order, pgL, sender) //fun�ao usada na parte de ocultar/exibir
{

	/*
	# par�metros #
	dataInicio <= "per�odo dos laudos" >= dataFim
	executor: m�dico q emitiu o laudo
	order: ordena��o
	pgL: p�gina corrente na listagem de laudos
	sender: quem chamou a fun��o, se foi rotina de ordena��o ou links oculta/exibe
	*/

	var url=null;
	var req = null;

	// forma a URL, dependendo dos par�metros que foram passados
	url = "oculta_exibe_ajax.php?dataInicio="+dataInicio+"&dataFim="+dataFim+"&sid="+Math.random()+"&sid2="+Math.random();
	if (order!=null) url = url+"&order="+order;
	if (pgL!=null) url = url+"&pgL="+pgL;
	if (sender!=null) url = url+"&sender="+sender;
	// procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {

		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="medicos_laudos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("medicos_laudos").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}
		req.open("GET", url, true);
		req.send(null);

		// procura por uma vers�o ActiveX (IE)
	} else if (window.ActiveXObject) {

		req = new ActiveXObject("Microsoft.XMLHTTP");
		req.onreadystatechange = function()	{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="medicos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("medicos_laudos").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}
		req.open("GET", url, true);
		req.send();

	}

}

function oculta(id, flag) //fun�ao usada na parte de ocultar/exibir
{
	var url=null;
	var req2 = null;
	// forma a URL, dependendo dos par�metros que foram passados
	url = "oculta.php?id="+id+"&ocultar="+flag+"&sid1="+Math.random()+"&sid2="+Math.random();
	// procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {

		req2 = new XMLHttpRequest();
		req2.onreadystatechange = function() {
			// apenas quando o estado for "completado"
			if (req2.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req2.status == 200) {
					// procura pela div id="medicos_laudos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("oculto").innerHTML = req2.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req2.statusText);
				}
			}
		}
		req2.open("GET", url, true);
		req2.send(null);

		// procura por uma vers�o ActiveX (IE)
	} else if (window.ActiveXObject) {

		req2 = new ActiveXObject("Microsoft.XMLHTTP");
		req2.onreadystatechange = function()	{
			// apenas quando o estado for "completado"
			if (req2.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req2.status == 200) {
					// procura pela div id="medicos" e insere o conteudo retornado nela, como texto HTML
					document.getElementById("oculto").innerHTML = req2.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req2.statusText);
				}
			}
		}
		req2.open("GET", url, true);
		req2.send();
	}
}


function carrega_imagem(prontuario,cnpj,requisicao,nome,coment,image,width,heightA,heightB)
{
	req = null;
	url = "carrega_imagem.php?prontuario="+prontuario+"&cnpj="+cnpj+"&requisicao="+requisicao+"&nome="+nome+"&coment="+coment+"&image="+image+"&width="+width+"&heightA="+heightA+"&heightB="+heightB;

	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="atualiza" e insere o conteudo
					// retornado nela, como texto HTML
					document.getElementById("video").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", url, true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				// apenas quando o estado for "completado"
				if (req.readyState == 4) {
					// apenas se o servidor retornar "OK"
					if (req.status == 200) {
						// procura pela div id="atualiza" e insere o conteudo
						// retornado nela, como texto HTML
						document.getElementById("video").innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", url, true);
			req.send();
		}
	}
}

// cloves 07/02/2006
function carrega_video(width,height,prontuario,cnpj,requisicao,nome)
{
	req = null;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			// apenas quando o estado for "completado"
			if (req.readyState == 4) {
				// apenas se o servidor retornar "OK"
				if (req.status == 200) {
					// procura pela div id="atualiza" e insere o conteudo
					// retornado nela, como texto HTML
					document.getElementById("video").innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", "carrega_video.php?width="+width+"&height="+height+"&prontuario="+prontuario+"&cnpj="+cnpj+"&requisicao="+requisicao+"&nome="+nome, true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				// apenas quando o estado for "completado"
				if (req.readyState == 4) {
					// apenas se o servidor retornar "OK"
					if (req.status == 200) {
						// procura pela div id="atualiza" e insere o conteudo
						// retornado nela, como texto HTML
						document.getElementById("video").innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", "carrega_video.php?width="+width+"&height="+height+"&prontuario="+prontuario+"&cnpj="+cnpj+"&requisicao="+requisicao+"&nome="+nome, true);
			req.send();
		}
	}
}

var TestString = 'failed';

function InitializeTestPopup() {
	TestPopup = window.open('','','height=0,width=0');
	TestString = TestPopup;
	document.implogin.login.focus();
	TestPopup.close();
}

function Verdict() {
	if(TestString == 'failed' || TestString == null)
	{
		document.implogin.bt1.disabled = true;;
		alert('Para o correto funcionamento deste sistema, voc� deve habilitar janelas Popup. Consulte a Ajuda de seu navegador.');
	}
}


function cad_medico()
{
	t=0;
	var ereg=/^chk/;

	with(document.form)
	{
		for(i=0;i<elements.length;i++)
		{
			if(elements[i].type=="checkbox")
			{
				if(ereg.test(elements[i].name))
				{
					if (elements[i].checked==true)
					t++;
				}
			}
		}
	}

	if (t==0)
	{
		alert('Pelo menos um hospital deve ser selecionado.');
		return false;
	}
}

function cad_instituicao()
{
	t=0;
	//var ereg=/^chk/;

	with(document.form)
	{
		for(i=0; i< elements.length; i++)
		{
			if(elements[i].type=="checkbox")
			{
				//if(ereg.test(elements[i].name))
				//{
				if (elements[i].checked==true)
				t++;
				//}
			}
		}
	}

	if (t==0)
	{
		alert('Selecione os SETORES da institui��o.');
		return false;
	}
}

//==================================================================================================
//CHAMAD A		<input type="text" name="dt_feriado" size="10" maxlength="10" onKeyDown="javascript:if(window.event.keyCode==13){window.event.keyCode=9};" onKeyUp="javascript: this.value=data(this.value);" style="" value=<?echo "$dt_feriado";?>>
//==================================================================================================
function data(valor)
{
	var aceita = '0123456789/';
	var resultado = '';
	for (i=0; i<=valor.length; i++)
	{
		for (j=0; j<=aceita.length; j++)
		{
			if (valor.charAt(i)==aceita.charAt(j))
			{
				if ((i==0)&&(valor.charAt(i)=='/'))
				{
				}
				else
				{
					if ((i==1)&&(valor.charAt(i)=='/'))
					{
						resultado = '0' + resultado;
					}
					if ((i==3)&&(valor.charAt(i)=='/'))
					{
					}
					else
					{
						if ((i==3)&&(valor.charAt(4)=='/'))
						{
							resultado = resultado + '0';
						}
						if ((i>=6)&&(valor.charAt(i)=='/'))
						{
						}
						else
						{
							resultado = resultado + valor.charAt(i);
						}
					}
				}
			}
		}
	}
	valor = resultado;
	resultado = '';
	for (i=0; i<=valor.length; i++)
	{
		if ((i==2)&&(valor.charAt(2)!='/')&&(valor.charAt(2)!=''))
		{
			resultado = resultado + '/';
		}
		if ((i==5)&&(valor.charAt(5)!='/')&&(valor.charAt(5)!=''))
		{
			resultado = resultado + '/';
		}
		resultado = resultado + valor.charAt(i);
	}
	return(resultado);
}

function abre_destino(quem, tipo, estado)
// utilizada no arquivo regulacao.php, p/ abrir a lista de instituicoes ou municipios plenos do estado em questao
// quem: nome do radio button
// tipo: i: instituicao, m: municipio pleno
// estado: de qual estado buscar as instituicoes / municipios
{
	if(quem.checked!=true)
	document.getElementById("local").innerHTML='';
	else
	{
		req = null;
		// Procura por um objeto nativo (Mozilla/Safari)
		if (window.XMLHttpRequest) {
			req = new XMLHttpRequest();
			req.onreadystatechange = function()
			{
				if (req.readyState == 4) {
					if (req.status == 200) {
						document.getElementById('local').innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}

			req.open("GET", "carrega_destino.php?estado="+estado+"&tipo="+tipo+"&semCache="+Math.random(), true);
			req.send(null);
			// Procura por uma versao ActiveX (IE)
		} else if (window.ActiveXObject) {
			req = new ActiveXObject("Microsoft.XMLHTTP");
			if (req) {
				req.onreadystatechange = function()
				{
					if (req.readyState == 4) {
						if (req.status == 200) {
							document.getElementById('local').innerHTML = req.responseText;
						} else {
							alert("Houve um problema ao obter os dados:\n" + req.statusText);
						}
					}
				}
				req.open("GET", "carrega_destino.php?estado="+estado+"&tipo="+tipo+"&semCache="+Math.random(), true);
				req.send();
			}
		}

	}
}

function estados(estado, o_q_abrir)
// abre gersa ou municipios do estado selecionado no combo
{
	if(o_q_abrir=='gersa')
	url="carrega_gersa.php?estado="+estado;
	if(o_q_abrir=='macro')
	url="carrega_macro.php?estado="+estado;
	if(o_q_abrir=='municipio')
	url="carrega_municipio.php?estado="+estado;
	//	if(quem.checked!=true)
	//		document.getElementById("local").innerHTML='';
	////	else
	//	{
	req = null;
	// Procura por um objeto nativo (Mozilla/Safari)
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			if (req.readyState == 4) {
				if (req.status == 200) {
					document.getElementById('local').innerHTML = req.responseText;
				} else {
					alert("Houve um problema ao obter os dados:\n" + req.statusText);
				}
			}
		}

		req.open("GET", url+"&semCache="+Math.random(), true);
		req.send(null);
		// Procura por uma versao ActiveX (IE)
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) {
			req.onreadystatechange = function()
			{
				if (req.readyState == 4) {
					if (req.status == 200) {
						document.getElementById('local').innerHTML = req.responseText;
					} else {
						alert("Houve um problema ao obter os dados:\n" + req.statusText);
					}
				}
			}
			req.open("GET", url+"&semCache="+Math.random(), true);
			req.send();
		}
	}

	//	}
}

function toogleImgExame(){
	var x = document.getElementsByTagName('div');
	for (i=0; i<x.length; i++)
	if (x[i].attributes['class'] && x[i].attributes['class'].value == "imgExame")
	x[i].style.display = (x[i].style.display != 'none' ? 'none' : '' );
	return;
}

/**
fun�ao que verifica se h� um checkbox marcado, e ent�o gera os protocolos
**/
function verificaCheckbox(numero_check) {

	document.consulta.action='gerador_protocolo.php';
	document.consulta.submit();

}

/**
* Fun��o que verifica se o protocolo esta preenchido
*
* @return bool
*/
function submit_protocolo()
{
	if (document.formprotocolo.protocol.value == "") {
		alert('Por favor, informe seu protocolo.');
		document.formprotocolo.protocol.focus();
		return false;
	}else{
		return true;
	}
}


