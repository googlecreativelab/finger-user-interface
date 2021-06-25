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
  export let onSelect = () => {};
  export let value = null;

  let customSelect;
  let selected;

  $: if (selected) {
    onSelect(selected);
  }
</script>

<div class="custom-select" bind:this={customSelect} on:click|stopPropagation>
  <select bind:value={value}>
   <slot/>
  </select>
</div>

<style lang="scss">
  @import '../scss/vars';
  .custom-select {
    position: relative;
    &:after {
      position: absolute;
      content: "";
      top: 19px;
      right: 14px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #000 transparent transparent transparent;
    }
  }
  select {
    appearance: none;
    background: none;
    border-radius: 5px;
    border: 2px solid $fgColor;
    min-width: 136px;
    font-size: inherit;
    font-family: "Google Sans Mono";
    padding: 0.6rem 0.6rem;
  }
</style>
