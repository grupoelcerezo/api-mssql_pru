var config = require('../../dbconfig');//Instanciamos el archivo dbconfig
const sql = require('mssql');//Se necesita paquete mssql
//Funcion Async : Asyncrona esta devuelve un objeto

async function getDosis() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("select * from tb_wap_dosis_grl_01");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSugerencias() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query(" select * "
        + " from tb_dbo_odrfs_mmm_01 " 
        + " where U_Tipo = 0 "
        + "   and DocDate > getdate() - 90 ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCC(cat_id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, cat_id)
            .query("SELECT "
            + "  CODIGO, "
            + "  DESCRIPCION, "
            + "  isnull(cultivo,\'N/A\') as CULTIVO,  "
            + "  SUPERFICIE,  "
            + "  SUPERFICIE_HECTAREAS,  "
            + "  isnull(manejo,\'N/A\') as MANEJO,  "
            + "  isnull(medio,\'N/A\') as MEDIO,  "
            + "  isnull(altura,\'N/A\') as ALTURA,  "
            + "  isnull(edad,0) as EDAD,  "
            + "  isnull(camas,0) as CAMAS,  "
            + "  case ZONA "
            + "    when \'BCS O-I\' then \'BCS\' "
            + "    when \'BCS P-V\' then \'BCS\' "
            + "    else ZONA end as ZONA,  "
            + "  ENCARGADO_RANCHO,  "
            + "  ENCARGADO_CULTIVO,  "
            + "  CODE_EMP, "
            + "  EMPRESA, "
            + "  TEMPORADA "
            + "FROM "
            + "  tb_wap_cecos_grl_01  "
            + "WHERE "
            + "  CODIGO LIKE @input_parameter "
            + "  AND ZONA IS NOT NULL "
            + "  AND ESTATUS = \'Y\'  "
            + "ORDER by descripcion ");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getLocalidades() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("select distinct(upper(Location)) as Location from tb_wap_oitmi_grl_01 order by 1");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSectores() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query(" SELECT "
        + "   SC.*  "
        + " from  "
        + "   tb_wap_cecos_grl_01 CC,  "
        + "   tb_wap_sectr_grl_01 SC "
        + " where CC.ESTATUS = \'Y\' "
        + "   AND SC.centro_costo = CC.CODIGO "
        + "   and SC.ESTATUS = \'Y\' "
        + " ORDER BY centro_costo, CODIGO ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEmpresas() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT "
        + "  distinct upper(code_emp) as code_emp, upper(empresa) as empresa "
        + "FROM "
        + "  tb_wap_cecos_grl_01  "
        + "WHERE empresa is not null "
       + "ORDER by empresa ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getCutivos() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT "
        + "  distinct upper(cultivo) as cultivo "
        + "FROM "
        + "  tb_wap_cecos_grl_01  "
        + "WHERE cultivo is not null "
       + "ORDER by cultivo ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getMetodo() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query(" SELECT * "
        + " FROM tb_wap_metod_grl_01 ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getProductos() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT "
        + "  T0.ItemCode, "
        + "  upper(T0.ItemName) as ItemName,  "
        + "  upper(T0.Location) as Location,  "
        + "  upper(T0.almacen) as almacen,  "
        + "  T0.OnHabd, InvntryUOM  "
        + "FROM "
        + "  tb_wap_oitmi_grl_01 T0 "
        + "ORDER BY upper(T0.ItemName) ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUsuario(parametro) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, parametro)
            .query("select top 1"
            + "  u.id_usuario, "
            + "  u.nombre, "
            + "  u.apellidos, "
            + "  u.email, "
            + "  u.sucursal, "
            + "  CASE "
           + "    WHEN u.sucursal = \'OBREGÓN\' THEN \'SONORA\'  "
           + "    WHEN u.sucursal = \'CONSTITUCIÓN\' THEN \'BCS\'  "
            + "    WHEN u.sucursal = \'MATRIZ\' THEN \'MATRIZ\'  "
            + "    ELSE u.sucursal  "
            + "  END as zona, "
            + "  isnull(u.firma,\'NO\') as firma , "
            + "  u2.id_usuario as id_supervisor, "
            + "  u2.nombre + \' \' + u2.apellidos as nombre_supervisor, "
            + "  u2.email as email_supervisor, "
            + "  stuff( (SELECT \',\' + r.descripcion "
            + "            FROM roles r, usuarios_roles ur "
            + "             WHERE ur.id_usuario  = u.id_usuario "
            + "               AND r.id_rol       = ur.id_rol "
            + "             ORDER BY r.id_rol  "
            + "            FOR XML PATH(\'\'), TYPE).value(\'.\', \'varchar(max)\') "
            + "         ,1,1,\'\') as roles "
            + "from  "
            + "  usuarios u, "
            + "  usuarios_supervisor us, "
            + "  usuarios u2 "
            + "where us.id_usuario = u.id_usuario "
            + "  and u2.id_usuario = us.supervisor "
            + "  and us.titular    = \'T\' "
            + "  and u.email       = @input_parameter ");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}



async function getRecetas(parametro) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, parametro)
            .query("  select  "
            + "    t0.DocEntry, convert(varchar(17),t0.DocDate, 113 )  DocDate, convert(varchar(11),t0.DocDueDate, 113 ) as DocDueDate, "
            + "    t0.CardName, t0.U_Motivo, t0.U_Cultivo, t0.U_CC, t1.DESCRIPCION as ceco, "
            + "    t0.U_Sectores, t0.u_tipo,  "
            + "    dbo.fn_wap_tipor_grl_01(t0.u_tipo) as tipo, "
            + "    convert(varchar(17),t0.U_updDate, 113 ) as U_updDate, t0.U_DocEntry, t0.U_Metodo, tu.email, tu.nombre + \' \' + tu.apellidos as usuario, "
            + "    \' <a class=\"btn btn-lg fas fa-boxes tooltip-test\" title=\"Detalles de folio\" onclick=\"fnDet(\' + cast(t0.DocEntry as varchar) + \')\">  </a> \' as icon, "
            + "    case  "
            + "      when  t0.U_DocEntry is null then \'<i class=\"fas fa-clock\"></i>\' "
            + "      when  t2.DocEntry is null  then \'<i class=\"fas fa-ban\"></i>\' "
            + "      else  isnull(cast(t3.DocNum as varchar(50)), \'<i class=\"fas fa-user-clock\"></i>\' ) "
            + "    end  as estatus "
            + "  from tb_dbo_odrfs_mmm_01 t0 "
            + "    left join ODRF T2 ON   T0.U_DocEntry = T2.DocEntry   "
            + "    left join ORDR T3 ON   T3.draftKey   = T2.DocEntry , "
            + "    tb_wap_cecos_grl_01 t1, usuarios tu "
            + "  where t1.CODIGO  = t0.U_CC  "
            + "    and t0.usuario = tu.email ");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function getFoliosDetalles(parametro) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, parametro)
            .query(" select "
            + "   DocEntry, LineNum, ItemCode, Dscription, Quantity, U_Superficie, U_DosisSup, U_DC "
            + " from tb_dbo_odrfd_mmm_01 t0"
            + " where t0.DocEntry = @input_parameter "
            + " ORDER BY 2 ");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getTiposReceta() {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request().query(" select * from tb_wap_tipor_grl_01 ORDER BY 1 ");
        return categorias.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTiposReceta, 
    getFoliosDetalles,
    getRecetas,
    getUsuario, 
    getProductos, 
    getMetodo,
    getCutivos,
    getEmpresas,
    getDosis,
    getCC,  
    getSugerencias,  
    getLocalidades,
    getSectores
}