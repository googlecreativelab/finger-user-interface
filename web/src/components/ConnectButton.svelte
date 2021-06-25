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
  import { onMount } from "svelte";
  import { isConnected, isModelTransferred, lastInference, transferProgress, onboardingStep } from "../store";

  import connectButton from "tf4micro-motion-kit/web/button";

  let containerEl;
  let button;

  $: if(button && $isConnected){
    button.innerText = 'Transferring...';
  }

  $: if(button && $isModelTransferred){
    button.innerText = 'Transferred!';
    setTimeout(()=>{
      button.innerText = 'Disconnect';
    },1000)
  }
  
  onMount(() => {
    const modelConfig = {
      model: "./model.tflite",
      numClasses: 5,
      threshold: 0.181,
      numSamples: 25,
      captureDelay: 30,
      useMagnetometer: false,
    };

    button = connectButton(containerEl, {
      ...modelConfig,
      useMagnetometer: false,
      onInference(data){
        $lastInference = data;
      },
      onTransferProgress(p){
        $transferProgress = p * 100;
      },
      onDisconnect() {
        $isConnected = false;
        $isModelTransferred = false;
      },
      onConnect() {
        $isConnected = true;
      },
      onTransferCompleted() {
        $isModelTransferred = true;
        setTimeout(()=>{
          $onboardingStep = 1;
        }, 500)
      },
    });
    
    button.addEventListener("click", () => {
      //soundManager.userInit();
    });
  });
</script>

<div bind:this={containerEl} class:inverted={$onboardingStep===0} />


