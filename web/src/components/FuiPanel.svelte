<!--====================================================================
Copyright 2021 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
========================================================================-->
<script>
  import p5 from "../p5";
  import { lastInference, onboardingStep } from "../store";
  import { onMount } from "svelte";
  
  let sketchEl;
  let showInstructions = false;

  $: if ($lastInference) {
    p5.triggerGesture($lastInference.index);
  }

  $: if($onboardingStep >= 2){
    setTimeout(()=>{
      p5.resizeCanvas();
    },10);
  }

  onMount(()=>{
    p5.setup(sketchEl);
  });

</script>

<div class="panel" class:hidden={$onboardingStep < 2}>
  <div bind:this={sketchEl} class="p5-container" />

  <div class="instruction-gifs">
    <button on:click={()=>showInstructions=!showInstructions}>
      {#if showInstructions}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="white"
          />
        </svg>
      {:else}
      <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7802 11.7699L18.0902 9.92988C17.9502 9.85988 17.8002 9.81988 17.6402 9.81988H17.0002V5.62988C17.0002 4.30988 16.0402 3.12988 14.7302 3.00988C13.2502 2.87988 12.0002 4.04988 12.0002 5.49988V13.6499L10.0602 13.2499C9.87018 13.2199 9.04018 13.0999 8.33018 13.8099L6.93018 15.2299L12.1202 20.4199C12.4902 20.7899 13.0002 20.9999 13.5302 20.9999H19.9702C20.9502 20.9999 21.7802 20.2999 21.9402 19.3299L22.8602 13.8899C23.0102 13.0299 22.5702 12.1699 21.7802 11.7699ZM19.9702 18.9999H13.5302L9.75018 15.2199L14.0002 16.1099V5.49988C14.0002 5.21988 14.2202 4.99988 14.5002 4.99988C14.7802 4.99988 15.0002 5.21988 15.0002 5.49988V11.4999H16.7602L20.8902 13.5599L19.9702 18.9999Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H0V2H12V0ZM10 4H0V6H10V4ZM0 8H10V10H0V8Z" fill="white"/>
        </svg>        
      {/if}
    </button>
    {#if showInstructions}
    <img
      src="images/right.gif"
      loading="lazy"
      alt="wave index finger right"
      class="instruction-image"
    /><img
      src="images/twirl.gif"
      loading="lazy"
      alt="twirl index finger in circles"
      class="instruction-image"
    /><img
      src="images/pluck.gif"
      loading="lazy"
      alt="pluck index finger and thumb"
      class="instruction-image"
    /><img
      src="images/poke.gif"
      loading="lazy"
      alt="poke index finger forward"
      class="instruction-image"
    /><img
      src="images/left.gif"
      loading="lazy"
      id="w-node-_337169d6-ed16-8524-514c-bdf18658fcf1-fe64dae6"
      alt="wave index finger left"
      class="instruction-image"
    />
    {/if}
  </div>
</div>

<style lang="scss">
  .panel {
    height: 100vh;
    min-height: 800px;
    display: block;
    background: #B3B2E5;
    &.hidden {
      display: none;
    }
    position: relative;
    overflow: hidden;
  }
  .instruction-gifs {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    img {
      display: block;
      margin: 21px 42px;
    }

    button{
      border: none;
      padding: 10px;
      width: auto;
      height: auto;
      margin: 27px 0 0 42px;
      line-height: 0;
      &:hover{
        background: none;
      }
    }
  }
  .p5-container {
    width: 100%;
    height: 100%;

  }
</style>
