import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ViewChild, ElementRef } from '@angular/core'

import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'

@Component({
  selector: 'app-student-monitor',
  templateUrl: './student-monitor.component.html',
  styleUrls: ['./student-monitor.component.css']
})
export class StudentMonitorComponent implements OnInit, OnDestroy {
  @Input() roomCode: string;
  userAgent: UserAgent;

  ngOnInit(){
    this.getOrcreateConversation();
  }

  @ViewChild("localVideo") videoRef: ElementRef;

  constructor() {
  }

  conversation: any;
  remotesCounter = 0;

  getOrcreateConversation() {
    var localStream: any = null;

    this.userAgent = new UserAgent({
      uri: 'apiKey:myDemoApiKey'
    });

    this.userAgent.register().then((session: Session) => {

      const conversation: Conversation = session.getConversation(this.roomCode);
      this.conversation = conversation;

      conversation.on('streamListChanged', (streamInfo: any) => {
        console.log("streamListChanged :", streamInfo);
        if (streamInfo.listEventType === 'added') {
          if (streamInfo.isRemote === true) {
            conversation.subscribeToMedia(streamInfo.streamId)
              .then((stream: Stream) => {
                console.log('subscribeToMedia success', stream);
              }).catch((err) => {
              console.error('subscribeToMedia error', err);
            });
          }
        }
      });

      conversation.on('streamAdded', (stream: Stream) => {
        this.remotesCounter += 1;
        stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
      }).on('streamRemoved', (stream: any) => {
        this.remotesCounter -= 1;
        stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
      });

      this.userAgent.createStream({
        constraints: {
          audio: true,
          video: true
        }
      })
        .then((stream: Stream) => {

          console.log('createStream :', stream);
          localStream = stream;

          localStream.attachToElement(this.videoRef.nativeElement);

          conversation.join()
            .then(() => {
              conversation.publish(localStream).then((stream: Stream) => {
                console.log('published', stream);
              }).catch((err: any) => {
                console.error('publish error', err);
              });
            }).catch((err: any) => {
            console.error('Conversation join error', err);
          });
        }).catch((err: any) => {
        console.error('create stream error', err);
      });
    });
    //
    // setTimeout(()=>{
    //   userAgent.unregister().then(()=>{
    //     console.log("Unreg");
    //   });
    // }, 5000);
  }

  ngOnDestroy() {
    console.log("destroy message");
    this.userAgent.unregister().then(() => {
      console.log("Session Terminated");
    })
  }
}
