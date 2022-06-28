<template>

	<h1 v-if="!pokemon">Por favor, espere...</h1>

	<div v-else>

		<h1>¿Quién es este Pokemon?</h1>

		<PokemonPicture
		    :pokemonId='pokemon.id'
		    :showPokemon='showPokemon'
		/>

		<PokemonOptions
		    :pokemons="pokemonArr"
		    @selection="checkAnswer"
		/>

		<template v-if="showPokemon">
			<h2 class="fade-in">{{ message }}</h2>

			<button @click="newGame">
				Nuevo juego
			</button>
		</template>

	</div>

</template>

<script>
	import PokemonOptions from '@/components/PokemonOptions.vue';
	import PokemonPicture from '@/components/PokemonPicture.vue';
	import getPokemonOptions from '@/helpers/getPokemonOptions';

	export default {
		components: {
			PokemonPicture,
			PokemonOptions
		},
		data() {
			return {
				pokemonArr: [],
				pokemon: null,
				showPokemon: false,
				message: ''
			};
		},
		methods: {
			async mixPokemonArray() {
				this.pokemonArr = await getPokemonOptions();

				const rndInt = Math.floor( Math.random() * this.pokemonArr.length );
				this.pokemon = this.pokemonArr[ rndInt ];
			},
			checkAnswer( id ) {
				this.showPokemon = true;
				if ( this.pokemon.id === id ) {
					this.message = `¡Correcto!, el Pokemon es ${ this.pokemon.name }`;
				} else {
					this.message = `Opps, el Pokemon era ${ this.pokemon.name }`;
				}
			},
			newGame() {
				this.showPokemon = false;
				this.pokemon = null;
				this.pokemonArr = [];
				this.mixPokemonArray();
			}
		},
		mounted() {
			this.mixPokemonArray();
		}
	}
</script>