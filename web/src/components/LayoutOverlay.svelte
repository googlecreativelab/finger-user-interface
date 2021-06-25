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

  export let imageUrl;
  export let step = 0;

  function handleDragOver(ev) {
    ev.preventDefault();
  }

  function handleDrop(ev) {
    ev.preventDefault();
    let file;
    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          file = ev.dataTransfer.items[i].getAsFile();
          break;
        }
      }
    } else {
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        file = ev.dataTransfer.files[i];
        break;
      }
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageUrl = reader.result;
        step = 1;
      };
      reader.readAsDataURL(file);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "l") {
      step++;
      step %= 3;
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });
</script>

<div
  class={`overlay step-${step}`}
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  style={`background-image:url(${imageUrl})`}
/>

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-size: cover;
    transition: opacity 0.5s, filter 0.5s;
    &.step-0{
      opacity: 0;
    }
    &.step-1{
      opacity: 0.5;
      filter: invert(1);
      pointer-events: none;
    }
    &.step-2{
      opacity: 1;
      pointer-events: none;
    }
  }
</style>
