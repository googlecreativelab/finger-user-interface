/* ======================================================================
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
========================================================================*/

const userAgent = navigator.userAgent.toLowerCase();
const deviceInfo = {};

const isAndroidPhone =
  userAgent.includes("android") && userAgent.includes("mobile");
const isAndroidTablet =
  userAgent.includes("android") && !userAgent.includes("mobile");
const isIphone = /iphone/.test(userAgent) && !window.MSStream;
const isIpad =
  (/ipad/.test(userAgent) && !window.MSStream) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

if (isAndroidPhone || isIphone) {
  deviceInfo.type = "smartphone";
} else if (isAndroidTablet || isIpad) {
  deviceInfo.type = "tablet";
} else {
  deviceInfo.type = "desktop";
}

deviceInfo.isMobile = deviceInfo.type === "smartphone";
deviceInfo.isDesktop = deviceInfo.type === "desktop";
deviceInfo.isTablet = deviceInfo.type === "tablet";


// Browser
deviceInfo.isChromium = !!window.chrome;

// Ble
deviceInfo.isBluetoothSupported = !!navigator.bluetooth;

window.deviceInfo = deviceInfo;


export default deviceInfo;
