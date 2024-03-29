package com.satch.service

import com.satch.domain.Classification
import com.satch.domain.ClassificationGroup
import grails.transaction.Transactional

@Transactional
class ClassificationService {
    def notDisplayedClassifications = ['basic', 'system']
    def notDisplayedClassificationGroups = ['basic', 'supplier']

    def retrieveClassificationList(){
        return Classification.executeQuery(
                "from Classification where classificationId not in (:list)",
                [list: notDisplayedClassifications]
        )
    }

    def retrieveClassificationGroupList(){
        return ClassificationGroup.executeQuery(
                "from ClassificationGroup where classificationGroupId not in (:list)",
                [list:notDisplayedClassificationGroups]
        )
    }

    def formClassificationGroupListWithChild(ClassificationGroup classificationGroup){
        def classificationGroupList = []
        if(classificationGroup.childClassificationGroups){
            classificationGroup.childClassificationGroups.each {
                classificationGroupList.addAll formClassificationGroupListWithChild(it)
            }
        }
        classificationGroupList << classificationGroup
        return classificationGroupList
    }

    List classifications(){
        def classifications = Classification.findAll("from Classification as c where c.classificationId not in ('basic', 'system')");
        def classificationTree = classifications.collect{ classification ->
            [
                    classificationId: classification.classificationId,
                    description: classification.description,
                    classificationGroups: transformClassificationGroups(classification.classificationGroups.findAll{clsGrp -> !clsGrp.parentClassificationGroup})
            ]
        }
        return classificationTree
    }

    private List transformClassificationGroups(Set classificationGroups){
        if(!classificationGroups) return null
        return  classificationGroups.collect{ classificationGroup ->
            [
                    classificationGroupId: classificationGroup.classificationGroupId,
                    description: classificationGroup.description,
                    classificationId: classificationGroup.classification.classificationId,
                    classificationGroups: transformClassificationGroups(classificationGroup.childClassificationGroups)
            ]
        }
    }


}
