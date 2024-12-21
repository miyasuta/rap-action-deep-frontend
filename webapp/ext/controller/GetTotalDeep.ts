import ExtensionAPI from 'sap/fe/core/ExtensionAPI';
import Context from 'sap/ui/model/odata/v4/Context';
import ListReportExtensionAPI from 'sap/fe/templates/ListReport/ExtensionAPI';
import ODataContextBinding from 'sap/ui/model/odata/v4/ODataContextBinding';
import MessageBox from 'sap/m/MessageBox';
import NumberFormat from 'sap/ui/core/format/NumberFormat';

interface Error {
	message: string
	error: { 
		code: string
		details: Error[] 
	}
}

interface Result {
    amount: string
}

const namespace = "com.sap.gateway.srvd.zui_yasu_stock_o4.v0001."

/**
 * Generated event handler.
 *
 * @param this reference to the 'this' that the event handler is bound to.
 * @param pageContext the context of the page on which the event was fired
 */
export function getTotalDeep(this: ExtensionAPI, pageContext: Context) {
    //get selected contexts
    const ListReportExtensionAPI = this as ListReportExtensionAPI;
    const contexts = ListReportExtensionAPI.getSelectedContexts();
    const products = contexts.map(context => {
        return {
            productUuId: context.getProperty("Id"),
            isActiveEntity: context.getProperty("IsActiveEntity")
        }
    })
    
    contexts[0].getProperty("Id");

    //invoke action
    const model = ListReportExtensionAPI.getModel();
    const operation = model?.bindContext("/Stock/" + namespace + "calcStockAmountDeep(...)") as ODataContextBinding;
    operation.setParameter("dummy", "X");
    operation.setParameter("_product", products);
    
    const fnSuccess = () => {
        //show total
        const result = operation.getBoundContext().getObject() as Result;
        const amount = result.amount;
        const numberFormat = NumberFormat.getIntegerInstance({
            groupingEnabled: true
        });
        var formattedAmount = numberFormat.format(amount);
        MessageBox.show(`${formattedAmount} JPY`, {
            title: "Stock Amount"
        });
    }

    const fnError = (error:Error) => {
        debugger;
    }

    operation.invoke().then(fnSuccess, fnError);

}