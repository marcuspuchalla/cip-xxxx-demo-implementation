import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { DemoWalletConnect } from '../DemoWalletConnect';
import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { IConnectMessage } from '@fabianbormann/cardano-peer-connect/types';

const Home = () => {

  const [meerkatAddress, setMeerkatAddress] = useState('');

  let walletInfo = {
    address: "http://localhost:3002/home",
    name: "demo_wallet",
    icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAKIBIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8f+KX/BQn4BfA7x3feFvGvxw+EHg/xNpfl/bNI1vxlp2n39p5kayx+ZBLMsibo3RxuAyrqRwQa5/wD4exfss/8ARy3wA/8ADh6R/wDJFfzhf8F3fgZ/w1B/wc/eKPhp/an9h/8ACxPFfgzwx/aX2b7T/Z/23StHtvP8renmbPN3bN67tuNwzmvr/wD4gY/+rov/ADG//wB9KAP1+/4exfss/wDRy3wA/wDDh6R/8kUf8PYv2Wf+jlvgB/4cPSP/AJIr8gf+IGP/AKui/wDMb/8A30o/4gY/+rov/Mb/AP30oA/X7/h7F+yz/wBHLfAD/wAOHpH/AMkUf8PYv2Wf+jlvgB/4cPSP/kivyB/4gY/+rov/ADG//wB9KP8AiBj/AOrov/Mb/wD30oA/X7/h7F+yz/0ct8AP/Dh6R/8AJFH/AA9i/ZZ/6OW+AH/hw9I/+SK/IH/iBj/6ui/8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/rgn/oIr+Y7/AIPObZ7P/gqd4HnkXbFL8PbBkORyBqF+D+or+mbwHrVv4k8DaNqNnIs1pf2MFzBIrBldHjVlIIJBBBHIOKnA65YrdKtT8Xp+TNcy/wB/h/17j/6TA1qKKKkkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5gv+D1b/lKb4B/7JVp3/p31iv6fa/mC/4PVv8AlKb4B/7JVp3/AKd9Yr+n2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+YL/gpZ/yuSeHP+yq/Dj/ANJtCr+n2v5gv+Cln/K5J4c/7Kr8OP8A0m0Kv6faACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/GH9tP8A4NzPjP8AtH/8FwrX9pPRPFnwwtPAKeK/D+vSWV9fXyawsFglms6iJLRoS5Nu+wecAcrkrk4/Z6iiin7lCOGj8Mb2+dl+iHUfPVdaXxNJfdt+YV+S/wDwXC/4NjrD/got8VJ/i98IfE2lfD/4sXiwjVbXU1kTR9fkjKqty0sKPLbXCxjBdY5Fk8uMFUbfIf1ooqJU1KSn1Wz6lRqOKcej3R/PV4G+EP8AwW/+A3h5fCegarq2u6Ro080VtqGpa54Q1qe8Uys3mfatSd7x0bOUExDKpVdqBQo6n4f/APBDr/goh/wUC+JfhvxX+1H+0AfC3hn+17fVdT8LjXHvpbSWyYfZ2i0uwCaSjv5akSRzBl8wyMrSblP72UVtTqOE1Veslqm+61v9+pjUpqcJU9oyuml2e6PNv2w/2atN/bH/AGWvH3ws1i+u9L07x5olzo017aqGms/NQqsqqeGKthtp4OMd6/C3wn/wSV/4Kof8En55PDP7N/xJtfHfgS+kuFtbaw1fTWtdNhWYujtp+uAQ2k03mM7C0MvIYPI2FLf0N0VioctR1ItptWfmle35v9TZz5oezkrpO68np/kv0P52Yf8AggJ+35/wVz+NGka/+2J8RYfCXh7QZ/IMN1qVjf3cUDRgu+nafpmbCJpGjiSR3eJzgOVl2BT++H7OH7Pnhb9lH4E+Ffhx4KsP7N8LeDtOj03ToC25/LQcu7fxSOxZ3b+JmY967aitlO1P2UEkr3dur11fnq/vZi4XmqkndpWV+i7L8PuPzZ/4OIf+CGWpf8Fdvh54R1vwJrei6B8TvAJngtBq5eOw1iynKNJbyyxo7xujJvjbay5aRWAD70/Pf4FfsZf8Fl/D3wg8OfBOw1jUfh/8ObaCLRoL+fxL4b83QbMNlcX1q82prHGMBfILOqAIo2gLX9F1FZ4dexbUfhbu49L/APBu/vfc1qzc7N/ElZPr/S/RLoin4fsrjTdAsre8uWvbuC3jjnuGABuHCgM5AAAyQTwO9XKKKqUnJuTM4QUIqK6BRRRSKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5gv+D1b/lKb4B/7JVp3/p31iv6fa/mC/4PVv8AlKb4B/7JVp3/AKd9Yr+n2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+YL/gpZ/yuSeHP+yq/Dj/ANJtCr+n2v5gv+Cln/K5J4c/7Kr8OP8A0m0Kv6faACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+YL/g9W/5Sm+Af+yVad/6d9Yr+n2v5gv+D1b/AJSm+Af+yVad/wCnfWK/p9oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/mC/4KWf8rknhz/sqvw4/wDSbQq/p9r+YL/gpZ/yuSeHP+yq/Dj/ANJtCr+n2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/mC/4PVv+UpvgH/slWnf+nfWK/p9r+YL/g9W/wCUpvgH/slWnf8Ap31iv6faACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5gv+Cln/K5J4c/7Kr8OP8A0m0Kv6fa/mC/4KWf8rknhz/sqvw4/wDSbQq/p9oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5gv+D1b/lKb4B/7JVp3/p31iv6fa/mC/4PVv8AlKb4B/7JVp3/AKd9Yr+n2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+YL/gpZ/yuSeHP+yq/Dj/ANJtCr+n2v5gv+Cln/K5J4c/7Kr8OP8A0m0Kv6faACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+YL/g9W/5Sm+Af+yVad/6d9Yr+n2v5gv+D1b/AJSm+Af+yVad/wCnfWK/p9oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/mC/4KWf8rknhz/sqvw4/wDSbQq/p9r+YL/gpZ/yuSeHP+yq/Dj/ANJtCr+n2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/mC/4PVv+UpvgH/slWnf+nfWK/p9r+YL/g9W/wCUpvgH/slWnf8Ap31iv6faACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP5gv+Cln/K5J4c/7Kr8OP8A0m0Kv6fa/ky/4OCfjXqv7Nf/AAcqeOviLoVvp93rfgHxB4R8SafBfxu9rNcWej6TcRJKqMjmMvGoYK6kgnDA816h/wARq37U3/Qg/AD/AMEer/8AyzoA/p9or+YL/iNW/am/6EH4Af8Agj1f/wCWdH/Eat+1N/0IPwA/8Eer/wDyzoA/p9or+YL/AIjVv2pv+hB+AH/gj1f/AOWdH/Eat+1N/wBCD8AP/BHq/wD8s6AP6faK/mC/4jVv2pv+hB+AH/gj1f8A+WdH/Eat+1N/0IPwA/8ABHq//wAs6AP6faK/mC/4jVv2pv8AoQfgB/4I9X/+WdH/ABGrftTf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RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//9k=",
    version: "0.0.1",
    requestAutoconnect: true
  };

  let announce = [
    'https://pro.passwordchaos.gimbalabs.io',
    'wss://tracker.files.fm:7073/announce',
    'wss://tracker.btorrent.xyz',
    'ws://tracker.files.fm:7072/announce',
    'wss://tracker.openwebtorrent.com:443/announce',
  ];

  const [boostPeerConnect, setBoostPeerConnect] = React.useState(
    () => new DemoWalletConnect(walletInfo, localStorage.getItem('meerkat-boostwallet-seed'), announce)
  );

  window.addEventListener('beforeunload', (event: any) => {

    if (boostPeerConnect) {

      boostPeerConnect?.disconnect(dAppIdentifier)
    }
  })

  boostPeerConnect.setOnConnect((connectMessage: IConnectMessage) => {

    console.log('Wallet is now connected!')

    if(boostPeerConnect) {
      identicon.current = boostPeerConnect.getIdenticon()
    }

    setConnected('Connected to ' + connectMessage.dApp.name + " (" +connectMessage.dApp.address + " at: " + connectMessage.dApp.url + ")")
  })

  boostPeerConnect.setOnDisconnect((connectMessage: IConnectMessage) => {

    console.log('Wallet received on disconnect', connectMessage)

    identicon.current = null

    setConnected('Disconnected')
  })

  boostPeerConnect.setOnServerShutdown((connectMessage: IConnectMessage) => {

    console.log('Wallet received server shutdown', connectMessage)

    identicon.current = null
    setConnected('Disconnected')
  })

  boostPeerConnect.setOnApiInject((connectMessage: IConnectMessage) => {

    console.log('Wallet on api inject message', connectMessage)
  })

  const [dAppIdentifier, setDAppIdentifier] = useState('');
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const qrScanner = useRef<QrScanner | undefined>();
  const [qrOverlayVisible, setQrOverlayVisible] = useState(false);
  const identicon = useRef<string | null>(null);
  const [connected, setConnected] = useState('Disconnected');


  useEffect(() => {
    if (videoElement.current) {
      qrScanner.current = new QrScanner(
        videoElement.current,
        (result) => {
          if (qrScanner.current) {
            setDAppIdentifier(result.data.split(':')[0]);
            qrScanner.current.stop();
            setQrOverlayVisible(false);
          }
        },
        {
          returnDetailedScanResult: true,
        }
      );
    }
  }, []);

  const connectWithDApp = () => {

    console.log('connect with dapp')

    if(boostPeerConnect) {
      const seed = boostPeerConnect.connect(dAppIdentifier);
      localStorage.setItem('meerkat-boostwallet-seed', seed);
    }

    // setMeerkatAddress(boostPeerConnect.current.getAddress());
  };

  const disconnectDApp = () => {

    if(boostPeerConnect) {

      boostPeerConnect.disconnect(dAppIdentifier);
    }
  };

  const startQrScanner = () => {
    if (qrScanner.current) {
      qrScanner.current.start();
      setQrOverlayVisible(true);
    }
  };

  const stopQrScanner = () => {
    if (qrScanner.current) {
      qrScanner.current.stop();
      setQrOverlayVisible(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Example Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Example Wallet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 600, width: '80%' }}>
            <p>
              Paste the dapp identifier into this input field and click the
              connect button, or{' '}
              <span
                style={{
                  cursor: 'pointer',
                  color: 'var(--ion-color-primary, #3880ff)',
                }}
                onClick={startQrScanner}
              >
                scan the QR code.
              </span>
            </p>
            <video
              style={{
                width: '100%',
                height: qrOverlayVisible ? 'unset' : '0px',
              }}
              ref={videoElement}
            ></video>

            {!qrOverlayVisible && (
              <IonItem className="address-container">
                <IonInput
                  value={dAppIdentifier}
                  onIonChange={(event) =>
                    setDAppIdentifier(`${event.target.value}`)
                  }
                  placeholder="dApp identifier"
                ></IonInput>
              </IonItem>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 16,
              }}
            >
              {qrOverlayVisible ? (
                <IonButton onClick={stopQrScanner} fill="solid">
                  Stop Scanner
                </IonButton>
              ) :  connected === 'Disconnected' ? (
                <IonButton onClick={connectWithDApp} fill="solid">
                  Connect
                </IonButton>
              ) : <IonButton onClick={disconnectDApp} fill="solid">
                Disconnect
              </IonButton>
              }
            </div>

            <div>
              <span style={{ paddingLeft: "4px", textDecoration: 'underline' }}>meerkatAddress: { meerkatAddress }</span>
            </div>

            <div>
              { connected }
            </div>

            { identicon.current &&
                <div>

                  <img src={ identicon.current } alt={ 'identicon' }/>

                </div>
            }

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
