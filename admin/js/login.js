$(function(){

  $('.input_sub').on('click',function(e){
    // 阻止默认跳转页面 (表单里的submit会自动跳转页面)
    e.preventDefault();
    // 获取元素
    let username = $('.input_txt').val().trim();
    let password = $('.input_pass').val().trim();
    if(username == '' || password == ''){
      $('.modal-body').text('用户名和密码不能为空');
      $('#myModal').modal();
      return;
    }
    // 发送ajax请求
    $.ajax({
      // url : 'http://localhost:8080/api/v1/admin/user/login',
      url : window.BigNew.user_login,
      type : 'post',
      data : {
        username: username,
        password: password
      },
      dataType : 'json',
      success : function(res){
        $('.modal-body').text(res.msg);
        $('#myModal').modal();
        if(res.code == 200){
          // 本地存储
          window.localStorage.setItem('token',res.token);
          // 跳转到到主页
          $('#myModal').on('hidden.bs.modal',function(){
            window.location.href = './index.html';
          })
        }
      }
    })

  })

})