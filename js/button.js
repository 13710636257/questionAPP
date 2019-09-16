Vue.component('mybutton',{
	name:'mybutton',
	template:`<div class="btnpart">
		<button :disabled="banned" class="mybutton" @click="handleClick"><slot></slot></button>
	</div>`,
	props:{
		fontColor:{
			type:String,
			default:"#000"
		},
		banned:{
			type:Boolean,

		}
	},
	methods:{
		handleClick:function(){
			this.$emit('click');
		}
	}
	
})