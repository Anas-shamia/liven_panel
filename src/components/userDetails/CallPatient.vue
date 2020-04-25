<template>
    <div class="flex-wrap">
        <div class="w-full">
            <form action="">
                <div>
                    <label class="block mb-4 font-medium text-base text-blue-900">Note</label>
                    <textarea class="bg-white-900 resize-none w-full px-4 py-2 rounded"
                              placeholder="Type here your message"></textarea>
                </div>
            </form>
        </div>
        <div class="w-full mt-8">
            <div id="div_device" class="panel panel-default mb-4">
                <div class="select mb-4">
                    <label for="audioSource">Audio source: </label><select id="audioSource"></select>
                </div>
                <div class="select mb-4">
                    <label for="videoSource">Video source: </label><select id="videoSource"></select>
                </div>
            </div>

            <div id="div_join" class="panel panel-default">
                <div class="panel-body mb-4">
                  <div class="flex items-center">
                      <div class="mb-4">
                          App ID: <input id="appId" type="text" value="" size="36"></input>
                      </div>
                      <div class="mb-4 mx-4">
                          Channel: <input id="channel" type="text" value="1000" size="4"></input>
                      </div>
                      <div class="mb-4 mx-4">
                          Host: <input id="videoCheck" type="checkbox" checked></input>
                      </div>
                  </div>
                    <div class="flex items-center mt-4">
                        <button id="join" class="bg-blue-800 text-white-900 rounded-lg px-4 mr-2 py-2" @click="join()">Join</button>
                        <button id="leave" class="bg-blue-800 text-white-900 rounded-lg px-4 mx-2 py-2" @click="leave()">Leave</button>
                        <button id="publish" class="bg-blue-800 text-white-900 rounded-lg px-4 mx-2 py-2" @click="publish()">Publish</button>
                        <button id="unpublish" class="bg-blue-800 text-white-900 rounded-lg px-4 mx-2 py-2" @click="unpublish()">Unpublish</button>
                    </div>
                </div>
            </div>

            <div id="video" style="margin:0 auto;">
                <div id="agora_local" style="float:right;width:210px;height:147px;display:inline-block;"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    textarea {
        border: 1px solid #8492A6;
        height: 400px;
    }
</style>
<script>
    let client, localStream, camera, microphone;
    export default {
        data() {
            return {}
        },
        methods: {
            initCall() {
                if (!AgoraRTC.checkSystemRequirements()) {
                    alert("Your browser does not support WebRTC!");
                }
                AgoraRTC.Logger.error('this is error');
                AgoraRTC.Logger.warning('this is warning');
                AgoraRTC.Logger.info('this is info');
                AgoraRTC.Logger.debug('this is debug');

                this.getDevices();
            },
            getDevices() {
                let audioSelect = document.querySelector('select#audioSource');
                let videoSelect = document.querySelector('select#videoSource');
                AgoraRTC.getDevices(function (devices) {
                    for (let i = 0; i !== devices.length; ++i) {
                        let device = devices[i];
                        console.log(device);
                        let option = document.createElement('option');
                        option.value = device.deviceId;
                        if (device.kind === 'audioinput') {
                            option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                            audioSelect.appendChild(option);
                        } else if (device.kind === 'videoinput') {
                            option.text = device.label || 'camera ' + (videoSelect.length + 1);
                            videoSelect.appendChild(option);
                        } else {
                            console.log('Some other kind of source/device: ', device);
                        }
                    }
                });
            },
            join() {
                let audioSource = document.querySelector('select#audioSource');
                let videoSource = document.querySelector('select#videoSource');

                document.getElementById("join").disabled = true;
                document.getElementById("video").disabled = true;
                var channel_key = null;

                console.log("Init AgoraRTC client with App ID: " + appId.value);
                client = AgoraRTC.createClient({mode: 'live'});
                client.init(appId.value, function () {
                    console.log("AgoraRTC client initialized");
                    client.join(channel_key, channel.value, null, function (uid) {
                        console.log("User " + uid + " join channel successfully");

                        if (document.getElementById("video").checked) {
                            camera = videoSource.value;
                            microphone = audioSource.value;
                            localStream = AgoraRTC.createStream({
                                streamID: uid,
                                audio: true,
                                cameraId: camera,
                                microphoneId: microphone,
                                video: document.getElementById("video").checked,
                                screen: false
                            });
                            //localStream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
                            if (document.getElementById("video").checked) {
                                localStream.setVideoProfile('720p_3');

                            }

                            // The user has granted access to the camera and mic.
                            localStream.on("accessAllowed", function () {
                                console.log("accessAllowed");
                            });

                            // The user has denied access to the camera and mic.
                            localStream.on("accessDenied", function () {
                                console.log("accessDenied");
                            });

                            localStream.init(function () {
                                console.log("getUserMedia successfully");
                                localStream.play('agora_local');

                                client.publish(localStream, function (err) {
                                    console.log("Publish local stream error: " + err);
                                });

                                client.on('stream-published', function (evt) {
                                    console.log("Publish local stream successfully");
                                });
                            }, function (err) {
                                console.log("getUserMedia failed", err);
                            });
                        }
                    }, function (err) {
                        console.log("Join channel failed", err);
                    });
                }, function (err) {
                    console.log("AgoraRTC client init failed", err);
                });

                let channelKey = "";
                client.on('error', function (err) {
                    console.log("Got error msg:", err.reason);
                    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                        client.renewChannelKey(channelKey, function () {
                            console.log("Renew channel key successfully");
                        }, function (err) {
                            console.log("Renew channel key failed: ", err);
                        });
                    }
                });


                client.on('stream-added', function (evt) {
                    var stream = evt.stream;
                    console.log("New stream added: " + stream.getId());
                    console.log("Subscribe ", stream);
                    client.subscribe(stream, function (err) {
                        console.log("Subscribe stream failed", err);
                    });
                });

                client.on('stream-subscribed', function (evt) {
                    var stream = evt.stream;
                    console.log("Subscribe remote stream successfully: " + stream.getId());
                    if ($('div#video #agora_remote' + stream.getId()).length === 0) {
                        $('div#video').append('<div id="agora_remote' + stream.getId() + '" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
                    }
                    stream.play('agora_remote' + stream.getId());
                });

                client.on('stream-removed', function (evt) {
                    var stream = evt.stream;
                    stream.stop();
                    $('#agora_remote' + stream.getId()).remove();
                    console.log("Remote stream is removed " + stream.getId());
                });

                client.on('peer-leave', function (evt) {
                    var stream = evt.stream;
                    if (stream) {
                        stream.stop();
                        $('#agora_remote' + stream.getId()).remove();
                        console.log(evt.uid + " leaved from this channel");
                    }
                });
            },
            leave() {
                document.getElementById("leave").disabled = true;
                client.leave(function () {
                    console.log("Leavel channel successfully");
                }, function (err) {
                    console.log("Leave channel failed");
                });
            },
            publish() {
                document.getElementById("publish").disabled = true;
                document.getElementById("unpublish").disabled = false;
                client.publish(localStream, function (err) {
                    console.log("Publish local stream error: " + err);
                });
            },
            unpublish() {
                document.getElementById("publish").disabled = false;
                document.getElementById("unpublish").disabled = true;
                client.unpublish(localStream, function (err) {
                    console.log("Unpublish local stream failed" + err);
                });
            },
        },
        mounted() {
            this.initCall();
        }
    }
</script>
