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
  import NotSupported from "./NotSupported.svelte";

  let show = true;
  function handleDismiss(){
    show = false;
  }
</script>

{#if show}
<NotSupported>
  <h2>Mobile is not officially supported. Functionality may be limited.</h2>
  <button on:click={handleDismiss}>Proceed Anyway</button>
</NotSupported>
{/if}