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

<div class="not-supported-container">
    <slot/>
</div>

<style lang="scss">
  .not-supported-container {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #fff;
  }

  :global(.not-supported-container h2){
    font-family: "Google Sans Mono", "Roboto Mono", monospace;
    font-size: 16px;
    line-height: 30px;
    max-width: 454px;
    text-align: center;
  }
</style>
