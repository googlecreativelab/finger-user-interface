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

<div class="nav">
  <div class="row">
    <a
      href="https://experiments.withgoogle.com/collection/tfliteformicrocontrollers"
      target="_blank">About</a
    >
  </div>
  <div class="row">
    <a href="https://github.com/googlecreativelab/tf4micro-motion-kit/blob/main/FAQ.md" target="_blank">FAQ</a>
  </div>
</div>

<style lang="scss">
  .row {
    margin-bottom: 2.2rem;
  }
  .nav {
    position: fixed;
    bottom: 9px;
    left: 0;
    a {
      margin: 0;
      display: inline-block;
      transform: rotate(90deg);
      transform-origin: left bottom;
      margin-bottom: 6px;
    }
  }
  @media screen and (min-width: 905px) {
    .nav {
      bottom: 9px;
      left: 42px;
      a {
        transform: none;
        margin-bottom: 0;
      }
    }
  }
</style>
