import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ViewChild, ElementRef } from '@angular/core'

import { Conversation, UserAgent, Session, Stream } from '@apirtc/apirtc'

@Component({
  selector: 'app-monitor-test',
  templateUrl: './monitor-test.component.html',
  styleUrls: ['./monitor-test.component.css']
})
export class MonitorTestComponent implements OnInit, OnDestroy{

  testCode: string;
  userAgent: UserAgent;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testCode = params['testCode'];
    });
    this.getOrcreateConversation();
  }

  @ViewChild("localVideo") videoRef: ElementRef;

  conversation: any;
  remotesCounter = 0;

  getOrcreateConversation() {
    this.userAgent = new UserAgent({
      uri: 'apiKey:myDemoApiKey'
    });
    this.userAgent.register().then((session: Session) => {

      const conversation: Conversation = session.getConversation(this.testCode);
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

          conversation.join()
            .then(() => {
            }).catch((err: any) => {
              console.error('Conversation join error', err);
            });
        }).catch((err: any) => {
          console.error('create stream error', err);
        });
    });
  }

  ngOnDestroy() {
    console.log("destroy message");
    this.userAgent.unregister().then(() => {
      console.log("Session Terminated");
    })
  }
}
