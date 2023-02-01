export default interface Friend {
    id: number;
    fromId: number;
    toId: number;
    status: string;
    from: {};
    to:[];
    friendInfo: {
        id:number,avatarS3Key:string,firstname:string,lastname:string
    };
}
