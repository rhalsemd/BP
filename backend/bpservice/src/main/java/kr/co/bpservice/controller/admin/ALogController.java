package kr.co.bpservice.controller.admin;

import kr.co.bpservice.entity.user.User;
import kr.co.bpservice.service.admin.ALogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/admin/log")
public class ALogController {
    @Autowired
    private ALogService aLogService;

    @GetMapping("/get-user-data")
    public List<User> getUserData(){
        List<User> returnDay = null;
        return returnDay;
    }
}
