class Student {
  constructor(name, course, score) {
    this.name = name
    this.course = course
    this.score = score
  }
  accept(visitor) {
    visitor && visitor.visit(this)
  }
}

class Teacher {
  constructor(name, course) {
    this.name = name
    this.course = course
  }
  visit(student) {
    if (this.course === student.course) {
      console.log('this.course === student.course: ', this.course, student.course);
      console.log(`${new Date()}
      ${this.course} 老师 ${this.name} 查看了 ${student.name} 的成绩，结果是 ${student.score} 分`)
    } else {
      console.log('暂无权限查看该学生的其他课成绩.')
    }
  }
}

const s1 = new Student('lily', 'chinese', '99')
const s2 = new Student('lily', 'english', '99')
const s3 = new Student('lily', 'math', '99')

const chineseTeacher = new Teacher('wang', 'chinese')
const englishTeacher = new Teacher('zhang', 'english')
const mathTeacher = new Teacher('li', 'math')

s1.accept(chineseTeacher)
// s1.accept(englishTeacher)
// s1.accept(mathTeacher)
