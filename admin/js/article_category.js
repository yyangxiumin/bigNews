$(function () {
    getData();
    function getData() {
        $.get({
            url: BigNew.category_list,
            success: function (res) {
                let htmlStr = template("categoryList", res);
                $("tbody").html(htmlStr);
            }
        });
    }

    // 当点击取消按钮是将表单元素内的内容重置
    $("#btn-Close").on("click", function () {
        $("form")[0].reset();
    });

    // 当模态框弹出是我们需要判断是那个按钮被点击
    $("#myModal").on("show.bs.modal", function (e) {
        let dom = e.relatedTarget;
        // console.log(dom);
        if (dom == $("#xinzengfenlei")[0]) {
            $("#exampleModalLabel").text("新增文章分类");
            $("#btn-confirm").text("新增").addClass("btn-success").removeClass("btn-primary");
            // 将表单中的数据全部重置，而reset()重置这个方法是原生对象的。
            $("form")[0].reset();
            // 注册点击事件
            $("#btn-confirm").on("click", function () {
                let name = $("#recipient-name").val();
                let slug = $("#message-text").val();
                if (name == "" || slug == "") {
                    alert("请填写数据");
                    return;
                }
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        // console.log(res);
                        $("#myModal").modal("hide");
                        if (res.code == 201) {
                            getData();
                            // $.get({
                            //     url : BigNew.category_list,
                            //     success : function(res) {
                            //        let htmlStr = template('categoryList', res);
                            //        $('tbody').html(htmlStr);
                            //     }
                            // })
                        }
                    }
                });
            });
        } else {
            $("#exampleModalLabel").text("编辑文章分类");
            $("#btn-confirm").text("编辑").addClass("btn-primary").removeClass("btn-success");
            // 拿到id 
            let cateId = $(dom).attr("data-id");
            //   console.log(cateId);
            $.get({
                url: BigNew.category_search,
                data: {
                    id: cateId
                },
                success: function (res) {
                    //   console.log(res);
                    if (res.code == 200) {
                        $("#recipient-name").val(res.data[0].name);
                        $("#message-text").val(res.data[0].slug);
                        $("#cateid").val(res.data[0].id);
                    }
                }
            });
            //   注册点击事件
            $("#btn-confirm").on("click", function () {
                let name = $("#recipient-name").val();
                let slug = $("#message-text").val();
                let id = $("#cateid").val();
                $.post({
                    url: BigNew.category_edit,
                    data: {
                        id: id,
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        // console.log(res);
                        if (res.code == 200) {
                            $('#myModal').modal('hide');
                            getData();
                        }
                    }
                })
            });
        }
    });

    // 实现删除
    $('tbody').on('click', '#btn-delete', function () {
        //  console.log(123);
        let id = $(this).attr('data-id');
        let ans = confirm('你确定要删除吗');
        if (ans) {
            $.post({
                url: BigNew.category_delete,
                data: {
                    id: id
                },
                success: function (res) {
                    // console.log(res);
                    if (res.code == 204) {
                        getData();
                    }

                }
            })
        }

    })
});
