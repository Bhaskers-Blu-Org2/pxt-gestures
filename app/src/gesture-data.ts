import { observable } from "mobx";

export class Point {
    public X: number;
    public Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}


export class Gesture {
    @observable public samples: GestureSample[];
    @observable public labelNumber: number;
    @observable public name: string;
    @observable public description: string;
    @observable public displayGesture: GestureSample;
    
    private static id: number = 0;
    public gestureID: number;

    constructor() {
        this.samples = [];
        this.displayGesture = new GestureSample();
        this.gestureID = Gesture.id++;
        this.name = "gesture " + this.gestureID.toString();
        this.description = "description of this gesture will be here. it's a great and wonderful gesture. you won't be dissapointed " + this.gestureID.toString();
    }

    public getCroppedData(): SignalReading[][] {
        let all_data: SignalReading[][] = [];

        for (let i = 0; i < this.samples.length; i++) {
            let sample: SignalReading[] = [];

            for (let j = this.samples[i].cropStartIndex; j <= this.samples[i].cropEndIndex; j++) {
                sample.push(this.samples[i].rawData[j].Clone());
            }

            all_data.push(sample);
        }

        return all_data;
    }
}


export class GestureSample {
    public rawData: SignalReading[];
    public videoLink: any;
    public videoData: any;
    public startTime: number;
    public endTime: number;
    private static id: number = 0;
    public sampleID: number;
    public cropStartIndex: number;
    public cropEndIndex: number;

    constructor() {
        this.rawData = [];
        this.sampleID = GestureSample.id++;
    }

    public Clone(): GestureSample {
        let cloneSample = new GestureSample();

        for (let i = 0; i < this.rawData.length; i++) {
            cloneSample.rawData.push(this.rawData[i]);
        }

        cloneSample.videoLink = this.videoLink;
        cloneSample.videoData = this.videoData;
        cloneSample.startTime = this.startTime;
        cloneSample.endTime = this.endTime;
        cloneSample.cropStartIndex = this.cropStartIndex;
        cloneSample.cropEndIndex = this.cropEndIndex;

        return cloneSample;
    }
}


export class SignalReading {
    public X: number;
    public Y: number;
    public Z: number;

    constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }

    public Clone() {
        return new SignalReading(this.X, this.Y, this.Z);
    }
}


export class Match {
    public minDist: number;
    public Ts: number;
    public Te: number;
    public classNum: number;

    constructor(_dmin: number, _ts: number, _te: number, _classNum: number) {
        this.minDist = _dmin;
        this.Te = _te;
        this.Ts = _ts;
        this.classNum = _classNum;
    }

    public Length(): number {
        return this.Te - this.Ts;
    }
}


export enum DataType {
    Integer = 0,
    Float = 1
}