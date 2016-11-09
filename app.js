Vue.filter('currency', function (number) {
   return accounting.formatMoney(number,  {
										symbol : "R$",
										decimal : ".",
										thousand: ",",
										precision : 2,
										format: "%s%v"
									});
});

var currency = Vue.filter('currency');

Vue.filter('billDone', function (value) {
	
   return value == 1 ? "Paga" : "Não Paga";
});

var billDone = Vue.filter('billDone');

var app = new Vue({
  el: '#appvue',
  data: {
		title: 'Contas a pagar',
		status: false,
		menu:[
			{id:'0',title:'Lista Contas',href:'#'},
			{id:'1',title:'Criar Conta',href:'#'},
		],
		activedView: 0,
		bills: [
			{date_due:'21/10/2016',name:'Conta de luz',value:1000, done: true},
			{date_due:'21/10/2016',name:'Conta de água',value:1000, done: false},
			{date_due:'21/10/2016',name:'Conta de telefone',value:1000, done: false},
			{date_due:'21/10/2016',name:'Supermercado',value:1000, done: false},
			{date_due:'21/10/2016',name:'Cartão de crédito',value:1000, done: false},
			{date_due:'21/10/2016',name:'Gasolina',value:1000, done: false},
		],
		names:[
			'Conta de luz',
			'Conta de água',
			'Conta de telefone',
			'Supermercado',
			'Cartão de crédito',
			'Gasolina'
		],
		bill:{
			date_due:'',
			name:'',
			value:0, 
			done: 0
		}, 
		formType: ''
	},
	computed: {
		statusBills: function(){
			var count = 0;
			for(var i in this.bills){
				if(!this.bills[i].done){
					count++;
				}
			}
			this.status = count === 0 ? false : true;
			return count === 0 ? 'Não há contas a pagar' : 'Há '+count+' contas a pagar';
		},
		reversedMessage: function () {
		  return 'teste';
		}
	},
	methods: {
		showView: function(id){
		  this.activedView = id;
		  if(this.activedView == 1){
			this.formType = 'insert';
		  }
		},
		submit: function(){
			if(this.formType == 'insert'){
				this.bills.push(this.bill);
			}
			this.bill={
				date_due:'',
				name:'',
				value:0, 
				done: 0
			};			
			this.activedView = 0;
		},
		loadBill: function(bill){
			this.bill = bill;		
			this.activedView = 1;
		},
		delBill: function(index){
			var r = confirm("Deseja excluir esta conta?");
			if (r == true) {
				this.bills.splice(index, 1);				
				this.activedView = 0;
			}
				
		},
		changeState: function(o){
			o.done = !o.done;
			console.log(o.done);
				
		}
	}
  
});


