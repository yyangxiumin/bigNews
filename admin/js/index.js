$(function(){
    // 发送ajax请求
    $.ajax({
        url : window.BigNew.user_info,
        type : 'get',
        dataType : 'json',
        // 设置请求头 请求头中带上token
        // headers : {
        //     'Authorization' : window.localStorage.getItem('token'),
        // },
        success : function(res){
            // console.log(res);
        //   $('.user_info > img').attr('src', res.data.userPic);
        //   $('.user_center_link > img').attr('src', res.data.userPic);
          $('.user_info > span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
          $('.user_center_link > img, .user_info > img').attr('src', res.data.userPic);
        }
    })
    $('.logout').on('click',function(){
        // 删除token
        localStorage.removeItem('token');// removeItem(移除本地)
        // 跳转到登录页面
        window.location.href = './login.html';
    })

    // 点击左侧导航栏
    // 一级列表
    $('.level01').on('click', function(){
        // 排他思想
        $(this).addClass('active').siblings().removeClass('active');
        // 判断点击的是否是文章管理
        if($(this).index() == 1){
            // console.log(123);
            // $(this).siblings('.level02').slideToggle();
            $('.level02').slideToggle();

            // $('.level02 > li > a').first()[0].click();
            /*a标签模拟点击事件需要使用原生DOM元素调用click()方法;jquery对象无法调用,
            所以在这里我们获取到的a标签的jQuery对象要转换为原生的对象去调用click()这个方法
            */
            $('.level02 > li:eq(0) a')[0].click(); // 默认是第一个列表
            //点击这个div的时候，让其后面的箭头符号进行旋转，我们是通过添加一个类名的方式来处理
            $(this).find('b').toggleClass('rotate0');
        } else {
            // 如果点击不是文章管理就把二级列表的active移除
            $('.level02 > li').removeClass('active');
        }
    })

    // 二级列表
    $('.level02 > li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
    

    //  原生ajax
    // let xhr = new XMLHttpRequest();
    // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
    // xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'));
    // xhr.onreadystatechange = function(e){
    //     if(xhr.readyState == 4 && xhr.status == 200){
    //         let data = JSON.parse(xhr.responseText);
    //         console.log(data);
    //     }
    // };
    // xhr.send()


})
