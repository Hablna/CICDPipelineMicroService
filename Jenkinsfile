pipeline {
    agent any

    tools {
        maven 'Maven'
        nodejs 'Node'
    }

    stages {

        stage('Backend - Tests') {
            steps {
                dir('BackMicroService') {
                    sh 'mvn clean test'
                }
            }
        }



    }
}