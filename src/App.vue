<template>
  <div id="app">
    <div class="container">
      <h1>Mars Rover Mission</h1>
      <div class="input-group">
        <div class="input-item">
          <label for="x-rock">
            <img
              src="https://static.vecteezy.com/system/resources/previews/013/442/177/non_2x/close-up-of-big-stone-isolated-big-rock-png.png"
              alt="Rock X"
            />
            <span class="tooltip">This is an obstacle that you are going to find in a certain position. This obstacle belongs to X.</span>
          </label>
          <input id="x-rock" v-model.number="x" @input="validateNumber($event, 'x')" type="number" class="small-input" />
        </div>
        <div class="input-item">
          <label for="y-rock">
            <img
              src="https://static.vecteezy.com/system/resources/previews/013/442/177/non_2x/close-up-of-big-stone-isolated-big-rock-png.png"
              alt="Rock Y"
            />
            <span class="tooltip">This is an obstacle that you are going to find in a certain position. This obstacle belongs to Y.</span>
          </label>
          <input id="y-rock" v-model.number="y" @input="validateNumber($event, 'y')" type="number" class="small-input" />
        </div>
      </div>
      <div class="input-group">
        <div class="input-item">
          <label>Direction: </label>
          <select v-model="direction">
            <option>N</option>
            <option>E</option>
            <option>S</option>
            <option>W</option>
          </select>
        </div>
      </div>
      <div class="input-group">
        <div class="input-item">
          <label>Commands: </label>
          <input v-model="commands" @input="validateCommands($event)" />
          <span class="tooltip">In this section you must write the commands that the explorer is going to reproduce. Type [f] to move forward, type [l] to go left and [r] to move to the right.</span>
        </div>
      </div>
      <button @click="executeCommands" class="execute-btn">
        Execute Commands
      </button>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { roverService } from "./roverservice";
import { Position } from "./types";

export default defineComponent({
  name: "App",
  setup() {
    const x = ref<number>(0);
    const y = ref<number>(0);
    const direction = ref<Position["direction"]>("N");
    const commands = ref<string>("");
    const result = ref<string>("");

    const validateNumber = (event: Event, axis: string) => {
      const input = event.target as HTMLInputElement;
      if (isNaN(Number(input.value))) {
        input.value = input.value.slice(0, -1);
      }
    };

    const validateCommands = (event: Event) => {
      const input = event.target as HTMLInputElement;
      input.value = input.value.replace(/[^lfr]/gi, '');
      commands.value = input.value;
    };

    const executeCommands = () => {
      const rover = new roverService(x.value, y.value, direction.value);
      rover.placeObstacle(2, 2); 
      result.value = rover.move(commands.value.toLowerCase());
      result.value = rover.move(commands.value);
    };

    return {
      x,
      y,
      direction,
      commands,
      result,
      validateNumber,
      validateCommands,
      executeCommands,
    };
  },
});
</script>

<style scoped>
#app {
  background-image: url("https://frontiersmagazine.org/wp-content/uploads/2020/05/The-robots-and-the-planets.jpg");
  background-size: cover;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90vw;
  max-width: 600px; 
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

input[type="number"],
input[type="text"],
select {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #333;
  color: white;
}

.small-input {
  width: 60px; 
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

img {
  width: 30px; 
  height: 30px;
}

.execute-btn {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

.execute-btn:hover {
  background-color: #e68900;
}

.tooltip {
  display: none;
  position: absolute;
  top: 50%;
  left: 110%;
  transform: translateY(-50%);
  margin-left: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8); 
  color: white;
  border-radius: 5px;
  white-space: normal; 
  max-width: 250px; 
  text-align: left; 
}

.input-item:hover .tooltip {
  display: block;
}

p {
  margin-top: 20px;
}
</style>
