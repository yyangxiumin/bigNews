$(function(){
    $.get({
        url : BigNew.user_detail,
        success : function(res){
            // console.log(res);
            // $('#inputEmail1').val(res.data.username);
            // $('#inputEmail2').val(res.data.nickname);
            // $('#inputEmail3').val(res.data.nickname);
            // $('#inputEmail4').val(res.data.password);
            for(var key in res.data){
                // console.log(key, res.data[key]);
                // console.log($('input.' + key).val(res.data[key]));
                $('input.' + key).val(res.data[key]);
            }
            $('.user_pic').attr('src', res.data.userPic);
        }
    })
    
    $('#exampleInputFile').on('change',function(e){
        // console.log(this);
        // console.dir(this.files);
        let imgFile = this.files[0];
        let url = URL.createObjectURL(imgFile);
        $('.user_pic').attr('src', url);
    })

  $('.btn-edit').on('click',function(e){
    //   阻止默认行为
    e.preventDefault();
    // 获取表单元素
    let form = $('#form')[0];
    let data = new FormData(form);
    $.post({
        url : BigNew.user_edit,
        data : data,
        // 阻止编译
        processData : false,
        // 不需要设置请求头的类型
        contentType : false,
        success : function(res){
            // console.log(res);
            if(res.code == 200){
                $.get({
                    url : BigNew.user_info,
                    success : function(res) {
                        // 获取服务器返回数据 渲染页面
                       parent.$('.user_info > span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                       parent.$('.user_center_link > img, .user_info > img').attr('src', res.data.userPic);
                    }
                })
            }

        }
    })
  })

    


})
