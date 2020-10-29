import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import * as io from "socket.io-client";

import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: "chart";
  socket:SocketIOClient.Socket;
  pollQ: "";
  pollO: any[] = [];
  selected: 0;
  


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.socket=io.connect("http://localhost:8080");
  }
  ngOnInit() {
    this.socket.on('welcomeEvent', (data)=>{
      this.pollQ = data.question;
      this.pollO.push.apply(this.pollO, data.options);
      var i;
      for(i=0; i<data.options.length; i++) {
        this.pieChartLabels.push(data.options[i].text);
        this.pieChartData.push(data.options[i].count);
      }
      
      
    });

    this.socket.on("newResult", (data)=> {
      this.pieChartData[data.value]=data.count;
    
      
        
       
      

    });
    
  }

  sendValue(value) {
    let payload={value: value};
    this.socket.emit('newOp', payload);

  }
}
