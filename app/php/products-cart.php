<?php
$flag = $_GET['flag'];

if($flag == 'changeCount'){

    $idProd = $_GET['id'];
    $keyProd = $_GET['key'];
    $value = $_GET['countProduct'];

    $json_data = '{
        "send": "ok"
    }';

} else if($flag == 'coupon'){

    $value = $_GET['inputVal'];

    $json_data = '{
        "status": 1
    }';

}

$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);


echo $json_data;
exit;
?>
