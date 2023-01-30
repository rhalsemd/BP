package kr.co.bpservice.service.user;

import jakarta.transaction.Transactional;
import kr.co.bpservice.entity.brolly.*;
import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.repository.user.UBrollyPayRepository;
import kr.co.bpservice.repository.user.UBrollyBorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UBrollyBorrowService {
    @Autowired
    private UBrollyPayRepository uBrollyPayRepository;

    @Autowired
    private UBrollyBorrowRepository uBrollyBorrowRepository;

    @Transactional
    public void insertPayLog(BrollyPayLog brollyPayLog){
        uBrollyPayRepository.save(brollyPayLog);
    }

    @Transactional
    public BrollyRentLog insertRentLog(BrollyPayLog payId, BrollyCase caseId, BrollyPayLog brollyPayLog){
        BrollyRentLog brollyRentLog = new BrollyRentLog();
        brollyRentLog.setPayId(payId);
        brollyRentLog.setBrolly(getBrollyId(caseId));
        brollyRentLog.setBrollyCase(caseId);
        brollyRentLog.setState(false);
        brollyRentLog.setRegDt(LocalDateTime.now());
        brollyRentLog.setUptDt(brollyRentLog.getRegDt().plusDays(7));
        brollyRentLog.setUser(brollyPayLog.getUser());
        brollyRentLog.setDepositeMoney(10000);
        uBrollyBorrowRepository.save(brollyRentLog);
        return brollyRentLog;
    }

    @Transactional
    public void updateholder(int brollyHolder){
        uBrollyBorrowRepository.updateholder(brollyHolder);
    }

    public BrollyPayLog getPayLogId(String receiptId, User userId){
        return uBrollyPayRepository.getRentlogID(receiptId,userId);
    }

    public Brolly getBrollyId(BrollyCase caseId){
        return uBrollyBorrowRepository.getBrollyId(caseId);
    }

    public BrollyHolder getHolderNum(Brolly brollyId){
        return uBrollyBorrowRepository.getHolderNum(brollyId);
    }


}
