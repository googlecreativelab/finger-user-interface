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
  import { transferProgress } from "../store";
  export let label = "progress";
</script>

<p class="label">{label}</p>
<div class="container">
  <div class="progress">
    &#x5B;{#each Array(20) as _, i}{#if i < Math.round((($transferProgress - 1) / 100) * 20)}&#x3D;{:else}&nbsp;{/if}{/each}&#x5D;
  </div>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 8V6H16V4C16 2.9 15.1 2 14 2H12V0H10V2H8V0H6V2H4C2.9 2 2 2.9 2 4V6H0V8H2V10H0V12H2V14C2 15.1 2.9 16 4 16H6V18H8V16H10V18H12V16H14C15.1 16 16 15.1 16 14V12H18V10H16V8H18ZM12 6H6V12H12V6ZM4 14H14V4H4V14Z"
      fill="black"
    />
  </svg>
  <div>{Math.ceil($transferProgress)}%</div>
</div>

<style lang="scss">
  .progress {
    position: relative;
    height: 30px;
    overflow: hidden;
    display: inline-block;
  }
  .container {
    display: flex;
    flex-direction: row;
    img {
      width: 50px;
    }
  }
  .progress-bar {
    position: absolute;
    top: 9px;
    left: 0;
    bottom: 18px;
    z-index: 2;
    background: #eee;
  }

  svg {
    margin: 5px 10px;
  }

  .label{
    margin: 0;
    padding: 0;
    font-style: italic;
  }
</style>
