// https://wanago.io/2019/12/02/javascript-design-patterns-factories-typescript/

enum TEACHER_TYPE {
    CODING = 'coding',
    MUSIC = 'music'
}

interface ITeacherProperties {
    name: string;
}
class Teacher {
    public name: string;
    constructor(properties: ITeacherProperties) {
        this.name = properties.name
    }
}

interface ICodingTeatherProperties extends ITeacherProperties {
    programmingLanguage: string;
}
class CodingTeacher extends Teacher {
    public programmingLanguage: string;
    constructor(properties: ICodingTeatherProperties) {
        super(properties)
        this.programmingLanguage = properties.programmingLanguage
    }
}

interface IMusicTeacherProperties extends ITeacherProperties {
    instrument: string;
}
class MusicTeacher extends Teacher {
    public instrument: string;
    constructor(properties: IMusicTeacherProperties) {
        super(properties)
        this.instrument = properties.instrument
    }
}

class TeacherFactory {
    // method overload
    public static getTeacher(type: TEACHER_TYPE.CODING, properties: ICodingTeatherProperties): CodingTeacher
    public static getTeacher(type: TEACHER_TYPE.MUSIC, properties: IMusicTeacherProperties): MusicTeacher

    public static getTeacher(type: TEACHER_TYPE, properties: ICodingTeatherProperties & IMusicTeacherProperties) {
        switch(type) {
            case TEACHER_TYPE.CODING:
                return new CodingTeacher(properties)
            case TEACHER_TYPE.MUSIC:
                return new MusicTeacher(properties)
            default:
                throw new Error('wrong teacher type')
        }
    }
}

const codingTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.CODING, {
    programmingLanguage: 'JavaScript',
    name: 'John',
});
   
const musicTeacher = TeacherFactory.getTeacher(TEACHER_TYPE.MUSIC, {
    instrument: 'Guitar',
    name: 'Andy',
});
