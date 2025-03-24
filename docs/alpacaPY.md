<page>
  <title>Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/index.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Alpaca-py Documentation[#](#alpaca-py-documentation "Permalink to this heading")
--------------------------------------------------------------------------------

* * *

Introduction[#](#introduction "Permalink to this heading")
----------------------------------------------------------

Learn more about what Alpaca-py offers and how it’s different from the previous SDK on the [Getting Started](https://alpaca.markets/sdks/python/getting_started.html#introduction) page.

Broker[#](#broker "Permalink to this heading")
----------------------------------------------

The Broker API allows you to build the full brokerage experiences for your end users around account opening, funding and trading. Learn more on the [Broker](https://alpaca.markets/sdks/python/broker.html#broker) page.

Market Data[#](#market-data "Permalink to this heading")
--------------------------------------------------------

The Market Data API gives you access to real time and historical data for equities, crypto and options. Learn more on the [Market Data](https://alpaca.markets/sdks/python/market_data.html#market-data) page.

Trading[#](#trading "Permalink to this heading")
------------------------------------------------

Trade stocks & crypto with Alpaca’s easy to use Trading API. Paper trading is free and available to all Alpaca users. Learn more on the [Trading](https://alpaca.markets/sdks/python/trading.html#trading) page.

* * *

Discover Python Finance Libraries[#](#discover-python-finance-libraries "Permalink to this heading")
----------------------------------------------------------------------------------------------------

Here are some libraries that work well with Alpaca-py.

**Trading and Backtesting**

*   [Backtrader](https://github.com/backtrader/backtrader) - Python Backtesting library for trading strategies.
    
*   [Vectorbt](https://github.com/polakowo/vectorbt) - Find your trading edge, using a powerful toolkit for backtesting, algorithmic trading, and research.
    
*   [LiuAlgoTrader](https://github.com/amor71/LiuAlgoTrader/) - A scalable, multi-process ML-ready framework for effective algorithmic trading.
    
*   [FinRL](https://github.com/AI4Finance-Foundation/FinRL) - The first open-source project for financial reinforcement learning.
    

**Portfolio Analytics**

*   [Pyfolio](https://github.com/quantopian/pyfolio) - Portfolio and risk analytics in Python.
    
*   [FinQuant](https://github.com/fmilthaler/FinQuant) - A program for financial portfolio management, analysis and optimisation.
    

**FinTech Integrations**

*   [Plaid](https://github.com/plaid/plaid-python) - Connect user banking information.
    
*   [Onfido](https://github.com/onfido/onfido-python) - Identity verification / KYC.</content>
</page>

<page>
  <title>Getting Started - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/getting_started.html</url>
  <content>Toggle table of contents sidebar

About[#](#about "Permalink to this heading")
--------------------------------------------

Alpaca-py provides an interface for interacting with the API products Alpaca offers. These API products are provided as various REST, WebSocket and SSE endpoints that allow you to do everything from streaming market data to creating your own trading apps. You can learn about the API products Alpaca offers at [alpaca.markets](https://alpaca.markets/).

Usage[#](#usage "Permalink to this heading")
--------------------------------------------

Alpaca’s APIs allow you to do everything from building algorithmic trading strategies to building a full brokerage experience for your own end users. Here are some things you can do with Alpaca-py.

**Market Data API**: Access live and historical market data for 5000+ stocks, 20+ crypto, and options.

**Trading API**: Trade stock, crypto, and options with lightning fast execution speeds.

**Broker API & Connect**: Build investment apps - from robo-advisors to brokerages.

Installation[#](#installation "Permalink to this heading")
----------------------------------------------------------

Alpaca-py is supported on Python 3.7+. You can install Alpaca-py using pip. To learn more about version histories, visit the [PyPI page](https://pypi.org/project/alpaca-py/).

To install Alpaca-py, run the following pip command in your terminal.

### Errors[#](#errors "Permalink to this heading")

Try upgrading your pip before installing if you face errors.

pip install --upgrade pip

### Poetry[#](#poetry "Permalink to this heading")

If you’re using poetry to manage dependencies in your project. You can add Alpaca-py to your project by running

What’s New?[#](#what-s-new "Permalink to this heading")
-------------------------------------------------------

If you’ve used the previous python SDK [alpaca-trade-api](https://github.com/alpacahq/alpaca-trade-api-python), there are a few key differences to be aware of.

### Broker API[#](#broker-api "Permalink to this heading")

Alpaca-py lets you use Broker API to start building your investment apps! Learn more at the [Broker](https://alpaca.markets/sdks/python/broker.html#broker) page.

### OOP Design[#](#oop-design "Permalink to this heading")

Alpaca-py uses a more OOP approach to submitting requests compared to the previous SDK. To submit a request, you will most likely need to create a request object containing the desired request data. Generally, there is a unique request model for each method.

Some examples of request models corresponding to methods:

*   `GetOrdersRequest` for `TradingClient.get_orders()`
    
*   `CryptoLatestOrderbookRequest` for `CryptoHistoricalDataClient.get_crypto_latest_orderbook()`
    

**Request Models Usage Example**

To get historical bar data for crypto, you will need to provide a CryptoBarsRequest object.

from alpaca.data.historical import CryptoHistoricalDataClient
from alpaca.data.requests import CryptoBarsRequest
from alpaca.data.timeframe import TimeFrame

\# no keys required for crypto data
client \= CryptoHistoricalDataClient()

request\_params \= CryptoBarsRequest(
                        symbol\_or\_symbols\=\["BTC/USD", "ETH/USD"\],
                        timeframe\=TimeFrame.Day,
                        start\="2022-07-01"
                 )

bars \= client.get\_crypto\_bars(request\_params)

### Data Validation[#](#data-validation "Permalink to this heading")

Alpaca-py uses pydantic to validate data models at run-time. This means if you are receiving request data via JSON from a client. You can handle parsing and validation through Alpaca’s request models. All request models can be instantiated by passing in data in dictionary format.

Here is a rough example of what is possible.

@app.route('/post\_json', methods\=\['POST'\])
def do\_trade():
    \# ...

    order\_data\_json \= request.get\_json()

    \# validate data
    MarketOrderRequest(\*\*order\_data\_json)

    \# ...

### Many Clients[#](#many-clients "Permalink to this heading")

Alpaca-py has a lot of client classes. There is a client for each API and even asset class specific clients (`StockHistoricalDataClient`, `CryptoHistoricalDataClient`, `OptionHistoricalData`). This requires you to pick and choose clients based on your needs.

**Broker API:** `BrokerClient`

**Trading API:** `TradingClient`

**Market Data API:** `StockHistoricalDataClient`, `CryptoHistoricalDataClient`, `OptionHistoricalDataClient`, `CryptoDataStream`, `StockDataStream`, `OptionDataStream`

API Keys[#](#api-keys "Permalink to this heading")
--------------------------------------------------

### Trading and Market Data API[#](#trading-and-market-data-api "Permalink to this heading")

In order to use Alpaca’s services you’ll need to [sign up for an Alpaca account](https://app.alpaca.markets/signup) and retrieve your API keys. Signing up is completely free and takes only a few minutes. Sandbox environments are available to test out the API. To use the sandbox environment, you will need to provide sandbox/paper keys. API keys are passed into Alpaca-py through either `TradingClient`, `StockHistoricalDataClient`, `CryptoHistoricalDataClient`, `OptionHistoricalDataClient`, `StockDataStream`, `CryptoDataStream`, or `OptionDataStream`.

### Broker API[#](#id1 "Permalink to this heading")

To use the Broker API, you will need to sign up for a [broker account](https://broker-app.alpaca.markets/sign-up) and retrieve your Broker API keys. The API keys can be found on the dashboard once you’ve logged in. Alpaca also provides a sandbox environment to test out Broker API. To use the sandbox mode, provide your sandbox keys. Once you have your keys, you can pass them into `BrokerClient` to get started.</content>
</page>

<page>
  <title>Trading - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/trading.html</url>
  <content>Toggle table of contents sidebar

Alpaca offers brokerage services for equities and crypto. Equity trading is commission free while crypto trading fees are tiered. Alpaca-py allows you to place orders and manage your positions on your Alpaca brokerage account.

Paper Trading[#](#paper-trading "Permalink to this heading")
------------------------------------------------------------

Alpaca offers a paper trading sandbox environment so you can test out the API or paper trade your strategy before you go live. The paper trading environment is free to use. You can learn more about paper trading on the [Alpaca API documentation](https://alpaca.markets/docs/trading/paper-trading/).

To use paper trading, you will need to set the paper parameter to True when instantiating the TradingClient. Make sure the keys you are providing correspond to a paper account.

from alpaca.trading.client import TradingClient

\# paper=True enables paper trading
trading\_client \= TradingClient('api-key', 'secret-key', paper\=True)

Retrieving Account Details[#](#retrieving-account-details "Permalink to this heading")
--------------------------------------------------------------------------------------

You can access details about your brokerage account like how much buying power you have, whether you’ve been flagged by as a pattern day trader, your total equity.

from alpaca.trading.client import TradingClient

trading\_client \= TradingClient('api-key', 'secret-key')

account \= trading\_client.get\_account()

Assets[#](#assets "Permalink to this heading")
----------------------------------------------

The assets API serves a list of assets available on Alpaca for trading and data consumption. It is important to note that not all assets are tradable on Alpaca, and those assets will be marked with `tradable=False`. To learn more about Assets, visit the [Alpaca API documentation](https://alpaca.markets/docs/api-references/trading-api/assets/).

### Getting All Assets[#](#getting-all-assets "Permalink to this heading")

Retrieves a list of assets that matches the search parameters. If there is not any search parameters provided, a list of all available assets will be returned. Search parameters for assets are defined by the `GetAssetsRequest` model, which allows filtering by `AssetStatus`, `AssetClass`, and `AssetExchange`.

from alpaca.trading.client import TradingClient
from alpaca.trading.requests import GetAssetsRequest
from alpaca.trading.enums import AssetClass

trading\_client \= TradingClient('api-key', 'secret-key')

\# search for crypto assets
search\_params \= GetAssetsRequest(asset\_class\=AssetClass.CRYPTO)

assets \= trading\_client.get\_all\_assets(search\_params)

Orders[#](#orders "Permalink to this heading")
----------------------------------------------

The orders API allows you to submit orders and then manage those orders. You can customize your order with various order types, order time in forces or by creating multi-leg orders. To learn more about orders, visit the [Alpaca API documentation](https://alpaca.markets/docs/trading/orders/).

### Creating an Order[#](#creating-an-order "Permalink to this heading")

To create on order on Alpaca-py you must use an `OrderRequest` object. There are different `OrderRequest` objects based on the type of order you want to make. For market orders, there is `MarketOrderRequest`, limit orders have `LimitOrderRequest`, stop orders `StopOrderRequest`, and trailing stop orders have `TrailingStopOrderRequest`. Each order type have their own required parameters for a successful order.

Hint

For stocks, the notional parameter can only be used with Market orders. For crypto, the notional parameter can be used with any order type.

**Market Order**

A market order is an order to buy or sell a stock at the best available price. Generally, this type of order will be executed immediately. However, the price at which a market order will be executed is not guaranteed.

Market orders allow the trade of fractional shares for stocks. Fractional shares must be denoted either with a non-integer `qty` value or with the use of the `notional` parameter. The `notional` parameter allows you to denote the amount you wish to trade in units of the quote currency. For example, instead of trading 1 share of SPY, we can trade $200 of SPY. `notional` orders are inherently fractional orders.

from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce

trading\_client \= TradingClient('api-key', 'secret-key', paper\=True)

\# preparing orders
market\_order\_data \= MarketOrderRequest(
                    symbol\="SPY",
                    qty\=0.023,
                    side\=OrderSide.BUY,
                    time\_in\_force\=TimeInForce.DAY
                    )

\# Market order
market\_order \= trading\_client.submit\_order(
                order\_data\=market\_order\_data
               )

**Limit Order**

A limit order is an order to buy or sell a stock at a specific price or better. You can use the `LimitOrderRequest` model to prepare your order details.

from alpaca.trading.client import TradingClient
from alpaca.trading.requests import LimitOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce

trading\_client \= TradingClient('api-key', 'secret-key', paper\=True)

limit\_order\_data \= LimitOrderRequest(
                    symbol\="BTC/USD",
                    limit\_price\=17000,
                    notional\=4000,
                    side\=OrderSide.SELL,
                    time\_in\_force\=TimeInForce.FOK
                   )

\# Limit order
limit\_order \= trading\_client.submit\_order(
                order\_data\=limit\_order\_data
              )

### Getting All Orders[#](#getting-all-orders "Permalink to this heading")

We can query all the orders associated with our account. It is possible to narrow the query by passing in parameters through the `GetOrdersRequest` model.

from alpaca.trading.client import TradingClient
from alpaca.trading.requests import GetOrdersRequest
from alpaca.trading.enums import OrderSide, QueryOrderStatus

trading\_client \= TradingClient('api-key', 'secret-key', paper\=True)

\# params to filter orders by
request\_params \= GetOrdersRequest(
                    status\=QueryOrderStatus.OPEN,
                    side\=OrderSide.SELL
                 )

\# orders that satisfy params
orders \= trading\_client.get\_orders(filter\=request\_params)

### Cancel All Orders[#](#cancel-all-orders "Permalink to this heading")

We can attempt to cancel all open orders with this method. The method takes no parameters and returns a list of `CancelOrderResponse` objects. The cancellation of an order is not guaranteed. The `CancelOrderResponse` objects contain information about the cancel status of each attempted order cancellation.

from alpaca.trading.client import TradingClient

trading\_client \= TradingClient('api-key', 'secret-key', paper\=True)

\# attempt to cancel all open orders
cancel\_statuses \= trading\_client.cancel\_orders()

Positions[#](#positions "Permalink to this heading")
----------------------------------------------------

The positions endpoints lets you track and manage open positions in your portfolio. Learn more about the positions endpoints in the [API docs](https://alpaca.markets/docs/api-references/trading-api/positions/).

### Getting All Positions[#](#getting-all-positions "Permalink to this heading")

This method requires no parameters and returns all open positions in your portfolio. It will return a list of `Position` objects.

from alpaca.trading.client import TradingClient

trading\_client \= TradingClient('api-key', 'secret-key')

trading\_client.get\_all\_positions()

### Close All Positions[#](#close-all-positions "Permalink to this heading")

This method closes all your open positions. If you set the `cancel_orders` parameter to `True`, the method will also cancel all open orders, preventing you from entering into a new position.

from alpaca.trading.client import TradingClient

trading\_client \= TradingClient('api-key', 'secret-key')

\# closes all position AND also cancels all open orders
trading\_client.close\_all\_positions(cancel\_orders\=True)

Streaming Trade Updates[#](#streaming-trade-updates "Permalink to this heading")
--------------------------------------------------------------------------------

There is also a `TradingStream` websocket client which allows you to stream order updates. Whenever an order is submitted, filled, cancelled, etc, you will receive a response on the client.

You can learn more on the [API documentation](https://alpaca.markets/docs/api-references/trading-api/streaming/)

Here is an example

from alpaca.trading.stream import TradingStream

trading\_stream \= TradingStream('api-key', 'secret-key', paper\=True)

async def update\_handler(data):
    \# trade updates will arrive in our async handler
    print(data)

\# subscribe to trade updates and supply the handler as a parameter
trading\_stream.subscribe\_trade\_updates(update\_handler)

\# start our websocket streaming
trading\_stream.run()</content>
</page>

<page>
  <title>Broker - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/broker.html</url>
  <content>What is Broker API?[#](#what-is-broker-api "Permalink to this heading")
-----------------------------------------------------------------------

The Broker API allows you to build investment services. The Broker API lets you create brokerage accounts on behalf of your users, fund those accounts, place and manage orders on behalf of those accounts, journal cash and securities between accounts, and more.

Some common use cases of Broker API are:

*   Trading/investing app (non-financial institution)
    
*   Broker dealer (fully-disclosed, non-disclosed, omnibus)
    
*   Registered Investment Advisor (RIA)
    

We support most use cases internationally.

* * *

Getting Started with BrokerClient[#](#getting-started-with-brokerclient "Permalink to this heading")
----------------------------------------------------------------------------------------------------

In alpaca-py, all Broker API services are accessed through the `BrokerClient`. For each endpoint in the Broker API, there is a corresponding method within the client. To initialize a client, you will need to provide it your **API keys** which can be found on the [Broker dashboard](https://broker-app.alpaca.markets/). If you wish to use your sandbox keys, you will need to set the sandbox parameter to `True` when initializing.

Learn more about `BrokerClient` in the Broker reference page.

from alpaca.broker import BrokerClient

BROKER\_API\_KEY \= "api-key"
BROKER\_SECRET\_KEY \= "secret-key"

broker\_client \= BrokerClient(
                    api\_key\=Broker\_API\_KEY,
                    secret\_key\=BROKER\_SECRET\_KEY,
                    sandbox\=True,
                )

Using Request Objects[#](#using-request-objects "Permalink to this heading")
----------------------------------------------------------------------------

In Alpaca-py, many methods will require instantiating and passing in a separate object for the request parameters. For example, the `BrokerClient::create_journal` method requires you to pass in a `CreateJournalRequest` object as a parameter. Once successfully instantiated, the `CreateJournalRequest` object will contain all the data required for a successful request to the API.

Accounts[#](#accounts "Permalink to this heading")
--------------------------------------------------

The accounts API allows you to create and manage brokerage accounts on behalf of your users. To learn more about accounts on Broker API, visit the [Alpaca API documentation](https://alpaca.markets/docs/api-references/broker-api/accounts/accounts/).

### Create an Account[#](#create-an-account "Permalink to this heading")

You can create brokerage accounts on behalf of your users using the `BrokerClient::create_account` method. To create an account you need to first instantiate a `CreateAccountRequest` with all the relevant account details. `CreateAccountRequest` requires `contact`, `identity`, `disclosures`, and `agreements`. There are also two additional fields which are optional: `documents` and `trusted_contact`.

First we will need to prepare our account data by organizing its constituent parts. Then we can pass those parts into the `CreateAccountRequest` model before submitting our request.

from alpaca.broker.client import BrokerClient
from alpaca.broker.models import (
                        Contact,
                        Identity,
                        Disclosures,
                        Agreement
                    )
from alpaca.broker.requests import CreateAccountRequest
from alpaca.broker.enums import TaxIdType, FundingSource, AgreementType

broker\_client \= BrokerClient('api-key', 'secret-key')

\# Contact
contact\_data \= Contact(
            email\_address\="[\[email protected\]](https://alpaca.markets/cdn-cgi/l/email-protection)",
            phone\_number\="555-666-7788",
            street\_address\=\["20 N San Mateo Dr"\],
            city\="San Mateo",
            state\="CA",
            postal\_code\="94401",
            country\="USA"
            )
\# Identity
identity\_data \= Identity(
        given\_name\="John",
        middle\_name\="Smith",
        family\_name\="Doe",
        date\_of\_birth\="1990-01-01",
        tax\_id\="666-55-4321",
        tax\_id\_type\=TaxIdType.USA\_SSN,
        country\_of\_citizenship\="USA",
        country\_of\_birth\="USA",
        country\_of\_tax\_residence\="USA",
        funding\_source\=\[FundingSource.EMPLOYMENT\_INCOME\]
        )

\# Disclosures
disclosure\_data \= Disclosures(
        is\_control\_person\=False,
        is\_affiliated\_exchange\_or\_finra\=False,
        is\_politically\_exposed\=False,
        immediate\_family\_exposed\=False,
        )

\# Agreements
agreement\_data \= \[
    Agreement(
      agreement\=AgreementType.MARGIN,
      signed\_at\="2020-09-11T18:09:33Z",
      ip\_address\="185.13.21.99",
    ),
    Agreement(
      agreement\=AgreementType.ACCOUNT,
      signed\_at\="2020-09-11T18:13:44Z",
      ip\_address\="185.13.21.99",
    ),
    Agreement(
      agreement\=AgreementType.CUSTOMER,
      signed\_at\="2020-09-11T18:13:44Z",
      ip\_address\="185.13.21.99",
    ),
    Agreement(
      agreement\=AgreementType.CRYPTO,
      signed\_at\="2020-09-11T18:13:44Z",
      ip\_address\="185.13.21.99",
    )
\]

\# ## CreateAccountRequest ## #
account\_data \= CreateAccountRequest(
                        contact\=contact\_data,
                        identity\=identity\_data,
                        disclosures\=disclosure\_data,
                        agreements\=agreement\_data
                        )

\# Make a request to create a new brokerage account
account \= broker\_client.create\_account(account\_data)

### List All Accounts[#](#list-all-accounts "Permalink to this heading")

The `BrokerClient::list_accounts` method allows you to list all the brokerage accounts under your management. The method takes an optional parameter `search_parameters` which requires a `ListAccountsRequest` object. This parameter allows you to filter the list of accounts returned.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import ListAccountsRequest
from alpaca.broker.enums import AccountEntities

broker\_client \= BrokerClient('api-key', 'secret-key')

\# search for accounts created after January 30th 2022.
#Response should contain Contact and Identity fields for each account.
filter \= ListAccountsRequest(
                    created\_after\=datetime.datetime.strptime("2022-01-30", "%Y-%m-%d"),
                    entities\=\[AccountEntities.CONTACT, AccountEntities.IDENTITY\]
                    )

accounts \= broker\_client.list\_accounts(search\_parameters\=filter)

Funding[#](#funding "Permalink to this heading")
------------------------------------------------

The funding API allows you to create Bank/ACH connections and transfer funds in and out of accounts. To learn more about funding on Broker API, please visit the [Alpaca API documentation](https://alpaca.markets/docs/api-references/broker-api/funding/transfers/).

### Create an ACH Relationship[#](#create-an-ach-relationship "Permalink to this heading")

Before an account can be funded, it needs to have an external account connection established. There are two types of connections that be created: ACH relationships and bank relationships. ACH Relationships can be created using routing and account numbers, or via Plaid.

To use Plaid, you will require a `processor_token` provided by Plaid specifically for Alpaca. View this [article](https://alpaca.markets/learn/easily-allow-your-user-to-fund-their-account-with-plaid-and-broker-api/) to learn more

In this example we will use routing and account numbers to establish an ACH relationship.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import CreateACHRelationshipRequest
from alpaca.broker.enums import BankAccountType

broker\_client \= BrokerClient('api-key', 'secret-key')

account\_id \= "c8f1ef5d-edc0-4f23-9ee4-378f19cb92a4"

ach\_data \= CreateACHRelationshipRequest(
                    account\_owner\_name\="John Doe",
                    bank\_account\_type\=BankAccountType.CHECKING,
                    bank\_account\_number\="123456789abc",
                    bank\_routing\_number\="121000358",
                )

ach\_relationship \= broker\_client.create\_ach\_relationship\_for\_account(
                    account\_id\=account\_id,
                    ach\_data\=ach\_data
                )

### Create a Transfer[#](#create-a-transfer "Permalink to this heading")

After a bank or ACH relationship has been established for an account, transfers can be made. There are two types of transfers: incoming (deposits) or outgoing (withdrawals). Transfers based on ACH relationships must use `CreateACHTransferRequest` and bank relationships must use `CreateBankTransferRequest`.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import CreateACHTransferRequest
from alpaca.broker.enums import TransferDirection, TransferTiming

broker\_client \= BrokerClient('api-key', 'secret-key')

account\_id \= "c8f1ef5d-edc0-4f23-9ee4-378f19cb92a4"

transfer\_data \= CreateACHTransferRequest(
                    amount\=1000,
                    direction\=TransferDirection.INCOMING,
                    timing\=TransferTiming.IMMEDIATE,
                    relationship\_id\="0f08c6bc-8e9f-463d-a73f-fd047fdb5e94"
                )
transfer \= broker\_client.create\_transfer\_for\_account(
                account\_id\=account\_id,
                transfer\_data\=transfer\_data
            )

Journals[#](#journals "Permalink to this heading")
--------------------------------------------------

The journals API allows you to transfer cash and securities between accounts under your management. To learn more about the journals API, visit the [Alpaca API documentation](https://alpaca.markets/docs/api-references/broker-api/journals/).

### Create a Journal[#](#create-a-journal "Permalink to this heading")

A journal is made between two accounts. For every journal request, assets will leave `from_account` and into `to_account`. There are two types of journals: cash journals and security journals. Cash journals move the account currency between accounts. Security journals move stocks between accounts.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import CreateJournalRequest
from alpaca.broker.enums import JournalEntryType

broker\_client \= BrokerClient('api-key', 'secret-key')

journal\_data \= CreateJournalRequest(
                    from\_account\="c8f1ef5d-edc0-4f23-9ee4-378f19cb92a4",
                    entry\_type\=JournalEntryType.CASH,
                    to\_account\="0f08c6bc-8e9f-463d-a73f-fd047fdb5e94",
                    amount\=50
                )

journal \= broker\_client.create\_journal(journal\_data\=journal\_data)

### Create a Batch Journal[#](#create-a-batch-journal "Permalink to this heading")

A batch journal lets you journal from one account into many accounts at the same time.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import CreateBatchJournalRequest, BatchJournalRequestEntry
from alpaca.broker.enums import JournalEntryType

broker\_client \= BrokerClient('api-key', 'secret-key')

\# Receiving accounts
batch\_entries \= \[
    BatchJournalRequestEntry(
            to\_account\="d7017fd9-60dd-425b-a09a-63ff59368b62",
            amount\=50,
    ),
    BatchJournalRequestEntry(
            to\_account\="94fa473d-9a92-40cd-908c-25da9fba1e65",
            amount\=100,
    ),
    BatchJournalRequestEntry(
            to\_account\="399f85f1-cbbd-4eaa-a934-70027fb5c1de",
            amount\=700,
    ),
\]

batch\_journal\_data \= CreateBatchJournalRequest(
                    entry\_type\=JournalEntryType.CASH,
                    from\_account\="8f8c8cee-2591-4f83-be12-82c659b5e748",
                    entries\=batch\_entries
                )

batch\_journal \= broker\_client.create\_batch\_journal(batch\_data\=batch\_journal\_data)

Trading[#](#trading "Permalink to this heading")
------------------------------------------------

The Broker trading API allows you to place orders and manage positions on behalf of your users. To learn more about trading on Broker API, visit the [Alpaca API documentation](https://alpaca.markets/docs/api-references/broker-api/trading/orders/).

Attention

Keep in mind, all models necessary for trading on Broker API live within the `alpaca.broker` and **not** `alpaca.trading`. Although the trading models in `alpaca.broker` and `alpaca.trading` have the same name, they are different.

### Create an Order[#](#create-an-order "Permalink to this heading")

To create an order on Alpaca-py you must use an `OrderRequest` object. There are different `OrderRequest` objects based on the type of order you want to make. For market orders, there is `MarketOrderRequest`, limit orders have `LimitOrderRequest`, stop orders `StopOrderRequest`, and trailing stop orders have `TrailingStopOrderRequest`. Each order type have their own required parameters for a successful order.

from alpaca.broker.client import BrokerClient
from alpaca.broker.requests import MarketOrderRequest, LimitOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce

broker\_client \= BrokerClient('api-key', 'secret-key')

\# account to make order for
account\_id \= "c8f1ef5d-edc0-4f23-9ee4-378f19cb92a4"

\# preparing orders
market\_order\_data \= MarketOrderRequest(
                    symbol\="BTCUSD",
                    qty\=1,
                    side\=OrderSide.BUY,
                    time\_in\_force\=TimeInForce.GTC,
                    commission\=1
            )

limit\_order\_data \= LimitOrderRequest(
                    symbol\="SPY",
                    limit\_price\=300,
                    qty\=10,
                    side\=OrderSide.SELL,
                    time\_in\_force\=TimeInForce.FOK,
                    commission\=1
              )

\# Market order
market\_order \= broker\_client.submit\_order\_for\_account(
                account\_id\=account\_id,
                order\_data\=market\_order\_data
                )

\# Limit order
limit\_order \= broker\_client.submit\_order\_for\_account(
                account\_id\=account\_id,
                order\_data\=limit\_order\_data
               )

### Get All Positions[#](#get-all-positions "Permalink to this heading")

You can retrieve all open positions for a specific account using only the `account_id`. This will return a list of `Position` objects.

from alpaca.broker import BrokerClient

broker\_client \= BrokerClient('api-key', 'secret-key')

\# account to get positions for
account\_id \= "c8f1ef5d-edc0-4f23-9ee4-378f19cb92a4"

positions \= broker\_client.get\_all\_positions\_for\_account(account\_id\=account\_id)</content>
</page>

<page>
  <title>Market Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/market_data.html</url>
  <content>Toggle table of contents sidebar

The market data API allows you to access both live and historical data for equities, cryptocurrencies, and options. Over 5 years of historical data is available for thousands of equity and cryptocurrency symbols. Various data types are available such as bars/candles (OHLCV), trade data (price and sales), and quote data. For crypto, there is also orderbook data. For more information on the data types available, please look at the [API reference](https://alpaca.markets/docs/market-data/).

Subscription Plans[#](#subscription-plans "Permalink to this heading")
----------------------------------------------------------------------

Most market data features are free to use. However, if you are a professional or institution, you may wish to expand with the unlimited plan. Learn more about the subscriptions plans at [alpaca.markets/data](https://alpaca.markets/data).

API Keys[#](#api-keys "Permalink to this heading")
--------------------------------------------------

You can sign up for API keys [here](https://app.alpaca.markets/signup). API keys allow you to access stock data. Keep in mind, crypto data does not require authentication to use. i.e. you can initialize `CryptoHistoricalDataClient` without providing API keys. However, if you do provide API keys, your rate limit will be higher.

Historical Data[#](#historical-data "Permalink to this heading")
----------------------------------------------------------------

There are 2 historical data clients: `StockHistoricalDataClient`, `CryptoHistoricalDataClient`, and `OptionHistoricalDataClient`. The crypto data client does not require API keys to use.

### Clients[#](#clients "Permalink to this heading")

Historical Data can be queried by using one of the two historical data clients: `StockHistoricalDataClient`, `CryptoHistoricalDataClient`, and `OptionHistoricalDataClient`. Historical data is available for Bar, Trade and Quote datatypes. For crypto, latest orderbook data is also available.

from alpaca.data import CryptoHistoricalDataClient, StockHistoricalDataClient, OptionHistoricalDataClient

\# no keys required.
crypto\_client \= CryptoHistoricalDataClient()

\# keys required
stock\_client \= StockHistoricalDataClient("api-key",  "secret-key")
option\_client \= OptionHistoricalDataClient("api-key",  "secret-key")

### Retrieving Latest Quote Data[#](#retrieving-latest-quote-data "Permalink to this heading")

The latest quote data is available through the historical data clients. The method will return a dictionary of Trade objects that are keyed by the corresponding symbol. We will need to use the `StockLatestQuoteRequest` model to prepare the request parameters.

Attention

Models that are returned by both historical data clients are agnostic of the number of symbols that were passed in. This means that you must use the symbol as a key to access the data regardless of whether a single symbol or multiple symbols were queried. Below is an example of this in action.

**Multi Symbol**

Here is an example of submitting a data request for multiple symbols. The symbol\_or\_symbols parameter can accommodate both a single symbol or a list of symbols. Notice how the data for a single symbol is accessed after the query. We use the symbol we desire as a key to access the data.

from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest

\# keys required for stock historical data client
client \= StockHistoricalDataClient('api-key', 'secret-key')

\# multi symbol request - single symbol is similar
multisymbol\_request\_params \= StockLatestQuoteRequest(symbol\_or\_symbols\=\["SPY", "GLD", "TLT"\])

latest\_multisymbol\_quotes \= client.get\_stock\_latest\_quote(multisymbol\_request\_params)

gld\_latest\_ask\_price \= latest\_multisymbol\_quotes\["GLD"\].ask\_price

**Single Symbol**

This is a similar example but for a single symbol. The key thing to notice is how we still need to use the symbol as a key to access the data we desire. This might seem odd since we only queried a single symbol. However, this must be done since the data models are agnostic to the number of symbols.

from alpaca.data.historical import CryptoHistoricalDataClient
from alpaca.data.requests import CryptoLatestQuoteRequest

\# no keys required
client \= CryptoHistoricalDataClient()

\# single symbol request
request\_params \= CryptoLatestQuoteRequest(symbol\_or\_symbols\="ETH/USD")

latest\_quote \= client.get\_crypto\_latest\_quote(request\_params)

\# must use symbol to access even though it is single symbol
latest\_quote\["ETH/USD"\].ask\_price

### Retrieving Historical Bar Data[#](#retrieving-historical-bar-data "Permalink to this heading")

You can request bar (candlestick) data via the HistoricalDataClients. In this example, we query daily bar data for “BTC/USD” and “ETH/USD” since July 1st 2022 using `CryptoHistoricalDataClient`. You can convert the response to a multi-index pandas dataframe using the `.df` property.

from alpaca.data.historical import CryptoHistoricalDataClient
from alpaca.data.requests import CryptoBarsRequest
from alpaca.data.timeframe import TimeFrame
from datetime import datetime

\# no keys required for crypto data
client \= CryptoHistoricalDataClient()

request\_params \= CryptoBarsRequest(
                        symbol\_or\_symbols\=\["BTC/USD", "ETH/USD"\],
                        timeframe\=TimeFrame.Day,
                        start\=datetime(2022, 7, 1),
                        end\=datetime(2022, 9, 1)
                 )

bars \= client.get\_crypto\_bars(request\_params)

\# convert to dataframe
bars.df

\# access bars as list - important to note that you must access by symbol key
\# even for a single symbol request - models are agnostic to number of symbols
bars\["BTC/USD"\]

Real Time Data[#](#real-time-data "Permalink to this heading")
--------------------------------------------------------------

### Clients[#](#id2 "Permalink to this heading")

The data stream clients lets you subscribe to real-time data via WebSockets. There are clients for crypto data, stock data and option data. These clients are different from the historical ones. They do not have methods which return data immediately. Instead, the methods in these clients allow you to assign methods to receive real-time data.

from alpaca.data import CryptoDataStream, StockDataStream

\# keys are required for live data
crypto\_stream \= CryptoDataStream("api-key", "secret-key")

\# keys required
stock\_stream \= StockDataStream("api-key", "secret-key")
option\_stream \= OptionDataStream("api-key", "secret-key")

### Subscribing to Real-Time Quote Data[#](#subscribing-to-real-time-quote-data "Permalink to this heading")

This example shows how to receive live quote data for stocks. To receive real time data, you will need to provide the client an asynchronous function to handle the data. The client will assign this provided method to receive the real-time data as it is available.

Finally, you will need to call the `run` method to start receiving data.

from alpaca.data.live import StockDataStream

wss\_client \= StockDataStream('api-key', 'secret-key')

\# async handler
async def quote\_data\_handler(data):
    \# quote data will arrive here
    print(data)

wss\_client.subscribe\_quotes(quote\_data\_handler, "SPY")

wss\_client.run()</content>
</page>

<page>
  <title>References - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/index.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Common - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/common.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Market Data Reference - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data_api.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/common/requests.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

BaseTimeseriesDataRequest[#](#basetimeseriesdatarequest "Permalink to this heading")
------------------------------------------------------------------------------------

_class_ alpaca.data.requests.BaseTimeseriesDataRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_)[#](#alpaca.data.requests.BaseTimeseriesDataRequest "Permalink to this definition")

A base class for requests for time series data between a start and an end. This shouldn’t be instantiated directly. Instead, you should use one of the data type specific classes.

symbol\_or\_symbols[#](#alpaca.data.requests.BaseTimeseriesDataRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.BaseTimeseriesDataRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.BaseTimeseriesDataRequest.end "Permalink to this definition")

The end of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.BaseTimeseriesDataRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

currency[#](#alpaca.data.requests.BaseTimeseriesDataRequest.currency "Permalink to this definition")

The currency the data should be returned in. Default to USD.

Type:

Optional\[SupportedCurrencies\]

sort[#](#alpaca.data.requests.BaseTimeseriesDataRequest.sort "Permalink to this definition")

(Optional\[Sort\]): The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[alpaca.common.enums.Sort\]

BaseBarsRequest[#](#basebarsrequest "Permalink to this heading")
----------------------------------------------------------------

_class_ alpaca.data.requests.BaseBarsRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _timeframe: [TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")_)[#](#alpaca.data.requests.BaseBarsRequest "Permalink to this definition")

A base request object for retrieving bar data for securities. You most likely should not use this directly and instead use the asset class specific request objects.

symbol\_or\_symbols[#](#alpaca.data.requests.BaseBarsRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.BaseBarsRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.BaseBarsRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.BaseBarsRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

timeframe[#](#alpaca.data.requests.BaseBarsRequest.timeframe "Permalink to this definition")

The period over which the bars should be aggregated. (i.e. 5 Min bars, 1 Day bars)

Type:

[TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")

sort[#](#alpaca.data.requests.BaseBarsRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]</content>
</page>

<page>
  <title>Corporate Actions - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/corporate_actions.html</url>
  <content>Toggle site navigation sidebar

Toggle table of contents sidebar</content>
</page>

<page>
  <title>Historical Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/corporate_actions/historical.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

CorporateActionsClient[#](#corporateactionsclient "Permalink to this heading")
------------------------------------------------------------------------------

_class_ alpaca.data.historical.corporate\_actions.CorporateActionsClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.data.historical.corporate_actions.CorporateActionsClient "Permalink to this definition")

The REST client for interacting with Alpaca Corporate Actions API endpoints.

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_) → None[#](#alpaca.data.historical.corporate_actions.CorporateActionsClient.__init__ "Permalink to this definition")

Instantiates a Corporate Actions Client.

Parameters:

*   **api\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API key. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API secret key. Defaults to None.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token if authenticating via OAuth. Defaults to None.
    
*   **use\_basic\_auth** (_bool__,_ _optional_) – If true, API requests will use basic authorization headers.
    
*   **raw\_data** (_bool__,_ _optional_) – If true, API responses will not be wrapped and raw responses will be returned from methods. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]__,_ _optional_) – If specified allows you to override the base url the client points to for proxy/testing.
    

Get Corporate Actions[#](#get-corporate-actions "Permalink to this heading")
----------------------------------------------------------------------------

CorporateActionsClient.get\_corporate\_actions(_request\_params: [CorporateActionsRequest](https://alpaca.markets/sdks/python/api_reference/data/corporate_actions/requests.html#alpaca.data.requests.CorporateActionsRequest "alpaca.data.requests.CorporateActionsRequest")_) → Union\[Dict\[str, Any\], [CorporateActionsSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.corporate_actions.CorporateActionsSet "alpaca.data.models.corporate_actions.CorporateActionsSet")\][#](#alpaca.data.historical.corporate_actions.CorporateActionsClient.get_corporate_actions "Permalink to this definition")

Returns corporate actions data

Parameters:

**request\_params** ([_CorporateActionsRequest_](https://alpaca.markets/sdks/python/api_reference/data/corporate_actions/requests.html#alpaca.data.requests.CorporateActionsRequest "alpaca.data.requests.CorporateActionsRequest")) – The request params to filter the corporate actions data</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/corporate_actions/requests.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

CorporateActionsRequest[#](#corporateactionsrequest "Permalink to this heading")
--------------------------------------------------------------------------------

_class_ alpaca.data.requests.CorporateActionsRequest(_\*_, _symbols: Optional\[List\[str\]\] \= None_, _types: Optional\[List\[[CorporateActionsType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CorporateActionsType "alpaca.data.enums.CorporateActionsType")\]\] \= None_, _start: Optional\[date\] \= None_, _end: Optional\[date\] \= None_, _limit: Optional\[int\] \= 1000_, _sort: Optional\[Sort\] \= Sort.ASC_)[#](#alpaca.data.requests.CorporateActionsRequest "Permalink to this definition")

This request class is used to submit a request for corporate actions data. ref. [https://docs.alpaca.markets/reference/corporateactions-1](https://docs.alpaca.markets/reference/corporateactions-1)

symbols[#](#alpaca.data.requests.CorporateActionsRequest.symbols "Permalink to this definition")

The list of ticker identifiers.

Type:

Optional\[List\[str\]\]

types[#](#alpaca.data.requests.CorporateActionsRequest.types "Permalink to this definition")

The types of corporate actions to filter by. (default: all types)

Type:

Optional\[List\[[CorporateActionsType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CorporateActionsType "alpaca.data.enums.CorporateActionsType")\]\]

start[#](#alpaca.data.requests.CorporateActionsRequest.start "Permalink to this definition")

The inclusive start of the interval. Format: YYYY-MM-DD. (default: current day)

Type:

Optional\[date\]

end[#](#alpaca.data.requests.CorporateActionsRequest.end "Permalink to this definition")

The inclusive end of the interval. Format: YYYY-MM-DD. (default: current day)

Type:

Optional\[date\])

limit[#](#alpaca.data.requests.CorporateActionsRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. (default: 1000)

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.CorporateActionsRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]</content>
</page>

<page>
  <title>Stock Market Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/stock.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Historical Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/stock/historical.html</url>
  <content>Toggle table of contents sidebar

StockHistoricalDataClient[#](#stockhistoricaldataclient "Permalink to this heading")
------------------------------------------------------------------------------------

_class_ alpaca.data.historical.stock.StockHistoricalDataClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _sandbox: bool \= False_)[#](#alpaca.data.historical.stock.StockHistoricalDataClient "Permalink to this definition")

The REST client for interacting with Alpaca Market Data API stock data endpoints.

Learn more on [https://alpaca.markets/docs/market-data/](https://alpaca.markets/docs/market-data/)

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _sandbox: bool \= False_) → None[#](#alpaca.data.historical.stock.StockHistoricalDataClient.__init__ "Permalink to this definition")

Instantiates a Historical Data Client.

Parameters:

*   **api\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API key. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API secret key. Defaults to None.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token if authenticating via OAuth. Defaults to None.
    
*   **use\_basic\_auth** (_bool__,_ _optional_) – If true, API requests will use basic authorization headers. Set to true if using broker api sandbox credentials
    
*   **raw\_data** (_bool__,_ _optional_) – If true, API responses will not be wrapped and raw responses will be returned from methods. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]__,_ _optional_) – If specified allows you to override the base url the client points to for proxy/testing.
    
*   **sandbox** (_bool_) – True if using sandbox mode. Defaults to False.
    

Get Stock Bars[#](#get-stock-bars "Permalink to this heading")
--------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_bars(_request\_params: [StockBarsRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockBarsRequest "alpaca.data.requests.StockBarsRequest")_) → Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_bars "Permalink to this definition")

Returns bar data for an equity or list of equities over a given time period and timeframe.

Parameters:

**request\_params** (_GetStockBarsRequest_) – The request object for retrieving stock bar data.

Returns:

The bar data either in raw or wrapped form

Return type:

Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), RawData\]

Get Stock Quotes[#](#get-stock-quotes "Permalink to this heading")
------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_quotes(_request\_params: [StockQuotesRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockQuotesRequest "alpaca.data.requests.StockQuotesRequest")_) → Union\[[QuoteSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.QuoteSet "alpaca.data.models.quotes.QuoteSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_quotes "Permalink to this definition")

Returns level 1 quote data over a given time period for a security or list of securities.

Parameters:

**request\_params** (_GetStockQuotesRequest_) – The request object for retrieving stock quote data.

Returns:

The quote data either in raw or wrapped form

Return type:

Union\[[QuoteSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.QuoteSet "alpaca.data.models.quotes.QuoteSet"), RawData\]

Get Stock Trades[#](#get-stock-trades "Permalink to this heading")
------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_trades(_request\_params: [StockTradesRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockTradesRequest "alpaca.data.requests.StockTradesRequest")_) → Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_trades "Permalink to this definition")

Returns the price and sales history over a given time period for a security or list of securities.

Parameters:

**request\_params** (_GetStockTradesRequest_) – The request object for retrieving stock trade data.

Returns:

The trade data either in raw or wrapped form

Return type:

Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), RawData\]

Get Stock Latest Quote[#](#get-stock-latest-quote "Permalink to this heading")
------------------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_latest\_quote(_request\_params: [StockLatestQuoteRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockLatestQuoteRequest "alpaca.data.requests.StockLatestQuoteRequest")_) → Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_latest_quote "Permalink to this definition")

Retrieves the latest quote for an equity symbol or list of equity symbols.

Parameters:

**request\_params** ([_StockLatestQuoteRequest_](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockLatestQuoteRequest "alpaca.data.requests.StockLatestQuoteRequest")) – The request object for retrieving the latest quote data.

Returns:

The latest quote in raw or wrapped format

Return type:

Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], RawData\]

Get Stock Latest Trade[#](#get-stock-latest-trade "Permalink to this heading")
------------------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_latest\_trade(_request\_params: [StockLatestTradeRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockLatestTradeRequest "alpaca.data.requests.StockLatestTradeRequest")_) → Union\[Dict\[str, [Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\], Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_latest_trade "Permalink to this definition")

Retrieves the latest trade for an equity symbol or list of equities.

Parameters:

**request\_params** ([_StockLatestTradeRequest_](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockLatestTradeRequest "alpaca.data.requests.StockLatestTradeRequest")) – The request object for retrieving the latest trade data.

Returns:

The latest trade in raw or wrapped format

Return type:

Union\[Dict\[str, [Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\], RawData\]

Get Stock Latest Bar[#](#get-stock-latest-bar "Permalink to this heading")
--------------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_latest\_bar(_request\_params: StockLatestBarRequest_) → Union\[Dict\[str, [Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\], Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_latest_bar "Permalink to this definition")

Retrieves the latest minute bar for an equity symbol or list of equity symbols.

Parameters:

**request\_params** (_StockLatestBarRequest_) – The request object for retrieving the latest bar data.

Returns:

The latest minute bar in raw or wrapped format

Return type:

Union\[Dict\[str, [Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\], RawData\]

Get Stock Snapshot[#](#get-stock-snapshot "Permalink to this heading")
----------------------------------------------------------------------

StockHistoricalDataClient.get\_stock\_snapshot(_request\_params: [StockSnapshotRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockSnapshotRequest "alpaca.data.requests.StockSnapshotRequest")_) → Union\[Dict\[str, [Snapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.Snapshot "alpaca.data.models.snapshots.Snapshot")\], Dict\[str, Any\]\][#](#alpaca.data.historical.stock.StockHistoricalDataClient.get_stock_snapshot "Permalink to this definition")

Returns snapshots of queried symbols. Snapshots contain latest trade, latest quote, latest minute bar, latest daily bar and previous daily bar data for the queried symbols.

Parameters:

**request\_params** ([_StockSnapshotRequest_](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.StockSnapshotRequest "alpaca.data.requests.StockSnapshotRequest")) – The request object for retrieving snapshot data.

Returns:

The snapshot data either in raw or wrapped form

Return type:

Union\[SnapshotSet, RawData\]</content>
</page>

<page>
  <title>Real-Time Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/stock/live.html</url>
  <content>Toggle table of contents sidebar

StockDataStream[#](#stockdatastream "Permalink to this heading")
----------------------------------------------------------------

_class_ alpaca.data.live.stock.StockDataStream(_api\_key: str_, _secret\_key: str_, _raw\_data: bool \= False_, _feed: [DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed") \= DataFeed.IEX_, _websocket\_params: Optional\[Dict\] \= None_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.data.live.stock.StockDataStream "Permalink to this definition")

A WebSocket client for streaming live stock data.

_async_ close() → None[#](#alpaca.data.live.stock.StockDataStream.close "Permalink to this definition")

Closes the websocket connection.

register\_trade\_cancels(_handler: Callable\[\[Union\[TradeCancel, Dict\]\], Awaitable\[None\]\]_) → None[#](#alpaca.data.live.stock.StockDataStream.register_trade_cancels "Permalink to this definition")

Register a trade cancel handler. You can only subscribe to trade cancels by subscribing to the underlying trades.

Parameters:

**handler** (_Callable__\[__\[__Union__\[__TradeCancel__,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.

register\_trade\_corrections(_handler: Callable\[\[Union\[TradeCorrection, Dict\]\], Awaitable\[None\]\]_) → None[#](#alpaca.data.live.stock.StockDataStream.register_trade_corrections "Permalink to this definition")

Register a trade correction handler. You can only subscribe to trade corrections by subscribing to the underlying trades.

Parameters:

**handler** (_Callable__\[__\[__Union__\[__TradeCorrection__,_ _Dict__\]__\]_) – The coroutine callback function to handle the incoming data.

run() → None[#](#alpaca.data.live.stock.StockDataStream.run "Permalink to this definition")

Starts up the websocket connection’s event loop

stop() → None[#](#alpaca.data.live.stock.StockDataStream.stop "Permalink to this definition")

Stops the websocket connection.

_async_ stop\_ws() → None[#](#alpaca.data.live.stock.StockDataStream.stop_ws "Permalink to this definition")

Signals websocket connection should close by adding a closing message to the stop\_stream\_queue

subscribe\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_bars "Permalink to this definition")

Subscribe to minute bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Trade_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_daily\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_daily_bars "Permalink to this definition")

Subscribe to daily bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Bar_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_quotes(_handler: Callable\[\[Union\[[Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_quotes "Permalink to this definition")

Subscribe to quotes

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Trade_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_trades(_handler: Callable\[\[Union\[[Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_trades "Permalink to this definition")

Subscribe to trades.

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Trade_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_trading\_statuses(_handler: Callable\[\[Union\[TradingStatus, Dict\]\], Awaitable\[None\]\]_, _\*symbols_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_trading_statuses "Permalink to this definition")

Subscribe to trading statuses (halts, resumes)

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[__TradingStatus__,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_updated\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.subscribe_updated_bars "Permalink to this definition")

Subscribe to updated minute bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Bar_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

unsubscribe\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_bars "Permalink to this definition")

Unsubscribe from minute bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_daily\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_daily_bars "Permalink to this definition")

Unsubscribe from daily bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_quotes(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_quotes "Permalink to this definition")

Unsubscribe from quotes

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_trades(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_trades "Permalink to this definition")

Unsubscribe from trades

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_trading\_statuses(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_trading_statuses "Permalink to this definition")

Unsubscribe from trading statuses

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_updated\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.stock.StockDataStream.unsubscribe_updated_bars "Permalink to this definition")

Unsubscribe from updated bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html</url>
  <content>Toggle table of contents sidebar

BaseStockLatestDataRequest[#](#basestocklatestdatarequest "Permalink to this heading")
--------------------------------------------------------------------------------------

_class_ alpaca.data.requests.BaseStockLatestDataRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_)[#](#alpaca.data.requests.BaseStockLatestDataRequest "Permalink to this definition")

A base request object for retrieving the latest data for stocks. You most likely should not use this directly and instead use the asset class specific request objects.

symbol\_or\_symbols[#](#alpaca.data.requests.BaseStockLatestDataRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.BaseStockLatestDataRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

currency[#](#alpaca.data.requests.BaseStockLatestDataRequest.currency "Permalink to this definition")

The currency the data should be returned in. Default to USD.

Type:

Optional\[SupportedCurrencies\]

StockBarsRequest[#](#stockbarsrequest "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.data.requests.StockBarsRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _timeframe: [TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")_, _adjustment: Optional\[[Adjustment](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.Adjustment "alpaca.data.enums.Adjustment")\] \= None_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _asof: Optional\[str\] \= None_)[#](#alpaca.data.requests.StockBarsRequest "Permalink to this definition")

The request model for retrieving bar data for equities.

See BaseBarsRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.StockBarsRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

timeframe[#](#alpaca.data.requests.StockBarsRequest.timeframe "Permalink to this definition")

The period over which the bars should be aggregated. (i.e. 5 Min bars, 1 Day bars)

Type:

[TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")

start[#](#alpaca.data.requests.StockBarsRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.StockBarsRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.StockBarsRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

adjustment[#](#alpaca.data.requests.StockBarsRequest.adjustment "Permalink to this definition")

The type of corporate action data normalization.

Type:

Optional\[[Adjustment](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.Adjustment "alpaca.data.enums.Adjustment")\]

feed[#](#alpaca.data.requests.StockBarsRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

sort[#](#alpaca.data.requests.StockBarsRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

asof[#](#alpaca.data.requests.StockBarsRequest.asof "Permalink to this definition")

The asof date of the queried stock symbol(s) in YYYY-MM-DD format.

Type:

Optional\[str\]

currency[#](#alpaca.data.requests.StockBarsRequest.currency "Permalink to this definition")

The currency of all prices in ISO 4217 format. Default is USD.

Type:

Optional\[SupportedCurrencies\]

StockQuotesRequest[#](#stockquotesrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.data.requests.StockQuotesRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _asof: Optional\[str\] \= None_)[#](#alpaca.data.requests.StockQuotesRequest "Permalink to this definition")

This request class is used to submit a request for stock quote data.

See BaseTimeseriesDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.StockQuotesRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.StockQuotesRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.StockQuotesRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.StockQuotesRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

feed[#](#alpaca.data.requests.StockQuotesRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

sort[#](#alpaca.data.requests.StockQuotesRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

asof[#](#alpaca.data.requests.StockQuotesRequest.asof "Permalink to this definition")

The asof date of the queried stock symbol(s) in YYYY-MM-DD format.

Type:

Optional\[str\]

currency[#](#alpaca.data.requests.StockQuotesRequest.currency "Permalink to this definition")

The currency of all prices in ISO 4217 format. Default is USD.

Type:

Optional\[SupportedCurrencies\]

StockTradesRequest[#](#stocktradesrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.data.requests.StockTradesRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _asof: Optional\[str\] \= None_)[#](#alpaca.data.requests.StockTradesRequest "Permalink to this definition")

This request class is used to submit a request for stock trade data.

See BaseTimeseriesDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.StockTradesRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.StockTradesRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.StockTradesRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.StockTradesRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

feed[#](#alpaca.data.requests.StockTradesRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

sort[#](#alpaca.data.requests.StockTradesRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

asof[#](#alpaca.data.requests.StockTradesRequest.asof "Permalink to this definition")

The asof date of the queried stock symbol(s) in YYYY-MM-DD format.

Type:

Optional\[str\]

currency[#](#alpaca.data.requests.StockTradesRequest.currency "Permalink to this definition")

The currency of all prices in ISO 4217 format. Default is USD.

Type:

Optional\[SupportedCurrencies\]

StockLatestQuoteRequest[#](#stocklatestquoterequest "Permalink to this heading")
--------------------------------------------------------------------------------

_class_ alpaca.data.requests.StockLatestQuoteRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_)[#](#alpaca.data.requests.StockLatestQuoteRequest "Permalink to this definition")

This request class is used to submit a request for the latest stock quote data.

See BaseStockLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.StockLatestQuoteRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.StockLatestQuoteRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

currency[#](#alpaca.data.requests.StockLatestQuoteRequest.currency "Permalink to this definition")

The currency the data should be returned in. Default to USD.

Type:

Optional\[SupportedCurrencies\]

StockLatestTradeRequest[#](#stocklatesttraderequest "Permalink to this heading")
--------------------------------------------------------------------------------

_class_ alpaca.data.requests.StockLatestTradeRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_)[#](#alpaca.data.requests.StockLatestTradeRequest "Permalink to this definition")

This request class is used to submit a request for the latest stock trade data.

See BaseStockLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.StockLatestTradeRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.StockLatestTradeRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

currency[#](#alpaca.data.requests.StockLatestTradeRequest.currency "Permalink to this definition")

The currency the data should be returned in. Default to USD.

Type:

Optional\[SupportedCurrencies\]

StockSnapshotRequest[#](#stocksnapshotrequest "Permalink to this heading")
--------------------------------------------------------------------------

_class_ alpaca.data.requests.StockSnapshotRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_)[#](#alpaca.data.requests.StockSnapshotRequest "Permalink to this definition")

This request class is used to submit a request for snapshot data for stocks.

symbol\_or\_symbols[#](#alpaca.data.requests.StockSnapshotRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.StockSnapshotRequest.feed "Permalink to this definition")

The stock data feed to retrieve from.

Type:

Optional\[[DataFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.DataFeed "alpaca.data.enums.DataFeed")\]

currency[#](#alpaca.data.requests.StockSnapshotRequest.currency "Permalink to this definition")

The currency the data should be returned in. Default to USD.

Type:

Optional\[SupportedCurrencies\]

MostActivesRequest[#](#mostactivesrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.data.requests.MostActivesRequest(_\*_, _top: int \= 10_, _by: [MostActivesBy](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MostActivesBy "alpaca.data.enums.MostActivesBy") \= 'volume'_)[#](#alpaca.data.requests.MostActivesRequest "Permalink to this definition")

This request class is used to submit a request for most actives screener endpoint.

by[#](#alpaca.data.requests.MostActivesRequest.by "Permalink to this definition")

The metric used for ranking the most active stocks.

Type:

[MostActivesBy](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MostActivesBy "alpaca.data.enums.MostActivesBy")

top[#](#alpaca.data.requests.MostActivesRequest.top "Permalink to this definition")

Number of top most active stocks to fetch per day.

Type:

int

MarketMoversRequest[#](#marketmoversrequest "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.data.requests.MarketMoversRequest(_\*_, _top: int \= 10_, _market\_type: [MarketType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MarketType "alpaca.data.enums.MarketType") \= MarketType.STOCKS_)[#](#alpaca.data.requests.MarketMoversRequest "Permalink to this definition")

This request class is used to submit a request for most actives screener endpoint.

market\_type[#](#alpaca.data.requests.MarketMoversRequest.market_type "Permalink to this definition")

Screen specific market (stocks or crypto).

Type:

[MarketType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MarketType "alpaca.data.enums.MarketType")

top[#](#alpaca.data.requests.MarketMoversRequest.top "Permalink to this definition")

Number of top most active stocks to fetch per day.

Type:

int</content>
</page>

<page>
  <title>Screener API - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/stock/screener.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

ScreenerClient[#](#screenerclient "Permalink to this heading")
--------------------------------------------------------------

_class_ alpaca.data.historical.screener.ScreenerClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.data.historical.screener.ScreenerClient "Permalink to this definition")

The REST client for interacting with Alpaca Screener API endpoints.

Learn more on [https://docs.alpaca.markets/reference/mostactives](https://docs.alpaca.markets/reference/mostactives)

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_) → None[#](#alpaca.data.historical.screener.ScreenerClient.__init__ "Permalink to this definition")

Instantiates a Historical Data Client.

Parameters:

*   **api\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API key. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API secret key. Defaults to None.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token if authenticating via OAuth. Defaults to None.
    
*   **use\_basic\_auth** (_bool__,_ _optional_) – If true, API requests will use basic authorization headers.
    
*   **raw\_data** (_bool__,_ _optional_) – If true, API responses will not be wrapped and raw responses will be returned from methods. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]__,_ _optional_) – If specified allows you to override the base url the client points to for proxy/testing.
    

Get Most Actives[#](#get-most-actives "Permalink to this heading")
------------------------------------------------------------------

ScreenerClient.get\_most\_actives(_request\_params: [MostActivesRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.MostActivesRequest "alpaca.data.requests.MostActivesRequest")_) → Union\[Dict\[str, Any\], [MostActives](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.screener.MostActives "alpaca.data.models.screener.MostActives")\][#](#alpaca.data.historical.screener.ScreenerClient.get_most_actives "Permalink to this definition")

Returns most active stocks.

Get Market Movers[#](#get-market-movers "Permalink to this heading")
--------------------------------------------------------------------

ScreenerClient.get\_market\_movers(_request\_params: [MarketMoversRequest](https://alpaca.markets/sdks/python/api_reference/data/stock/requests.html#alpaca.data.requests.MarketMoversRequest "alpaca.data.requests.MarketMoversRequest")_) → Union\[Dict\[str, Any\], [Movers](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.screener.Movers "alpaca.data.models.screener.Movers")\][#](#alpaca.data.historical.screener.ScreenerClient.get_market_movers "Permalink to this definition")

Return market movers.</content>
</page>

<page>
  <title>Crypto Market Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/crypto.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Historical Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/crypto/historical.html</url>
  <content>Toggle table of contents sidebar

CryptoHistoricalDataClient[#](#cryptohistoricaldataclient "Permalink to this heading")
--------------------------------------------------------------------------------------

_class_ alpaca.data.historical.crypto.CryptoHistoricalDataClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _sandbox: bool \= False_)[#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient "Permalink to this definition")

A REST client for retrieving crypto market data.

This client does not need any authentication to use. You can instantiate it with or without API keys.

However, authenticating increases your data rate limit.

Learn more about crypto historical data here: [https://alpaca.markets/docs/api-references/market-data-api/crypto-pricing-data/historical/](https://alpaca.markets/docs/api-references/market-data-api/crypto-pricing-data/historical/)

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _sandbox: bool \= False_) → None[#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.__init__ "Permalink to this definition")

Instantiates a Historical Data Client for Crypto Data.

Parameters:

*   **api\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API key. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API secret key. Defaults to None.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token if authenticating via OAuth. Defaults to None.
    
*   **raw\_data** (_bool__,_ _optional_) – If true, API responses will not be wrapped and raw responses will be returned from methods. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]__,_ _optional_) – If specified allows you to override the base url the client points to for proxy/testing.
    
*   **use\_basic\_auth** (_bool__,_ _optional_) – If true, API requests will use basic authorization headers. Set to true if using broker api sandbox credentials
    
*   **sandbox** (_bool_) – True if using sandbox mode. Defaults to False.
    

Get Crypto Bars[#](#get-crypto-bars "Permalink to this heading")
----------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_bars(_request\_params: [CryptoBarsRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoBarsRequest "alpaca.data.requests.CryptoBarsRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_bars "Permalink to this definition")

Gets bar/candle data for a cryptocurrency or list of cryptocurrencies.

Parameters:

*   **request\_params** ([_CryptoBarsRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoBarsRequest "alpaca.data.requests.CryptoBarsRequest")) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for crypto bars.
    

Returns:

The crypto bar data either in raw or wrapped form

Return type:

Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), RawData\]

Get Crypto Quotes[#](#get-crypto-quotes "Permalink to this heading")
--------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_quotes(_request\_params: [CryptoQuoteRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoQuoteRequest "alpaca.data.requests.CryptoQuoteRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[[QuoteSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.QuoteSet "alpaca.data.models.quotes.QuoteSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_quotes "Permalink to this definition")

Returns the quote data for a cryptocurrency or list of cryptocurrencies.

Parameters:

*   **request\_params** ([_CryptoQuoteRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoQuoteRequest "alpaca.data.requests.CryptoQuoteRequest")) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for crypto quotes.
    

Returns:

The crypto quote data either in raw or wrapped form

Return type:

Union\[[QuoteSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.QuoteSet "alpaca.data.models.quotes.QuoteSet"), RawData\]

Get Crypto Trades[#](#get-crypto-trades "Permalink to this heading")
--------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_trades(_request\_params: [CryptoTradesRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoTradesRequest "alpaca.data.requests.CryptoTradesRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_trades "Permalink to this definition")

Returns the price and sales history over a given time period for a cryptocurrency or list of cryptocurrencies.

Parameters:

*   **request\_params** ([_CryptoTradesRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoTradesRequest "alpaca.data.requests.CryptoTradesRequest")) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for crypto trades.
    

Returns:

The trade data either in raw or wrapped form

Return type:

Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), RawData\]

Get Crypto Latest Quote[#](#get-crypto-latest-quote "Permalink to this heading")
--------------------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_latest\_quote(_request\_params: [CryptoLatestQuoteRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoLatestQuoteRequest "alpaca.data.requests.CryptoLatestQuoteRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_latest_quote "Permalink to this definition")

Returns the latest quote for a coin.

Parameters:

*   **request\_params** ([_CryptoLatestQuoteRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoLatestQuoteRequest "alpaca.data.requests.CryptoLatestQuoteRequest")) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for the latest crypto quote.
    

Returns:

The latest quote in raw or wrapped format

Return type:

Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], RawData\]

Get Crypto Latest Trade[#](#get-crypto-latest-trade "Permalink to this heading")
--------------------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_latest\_trade(_request\_params: [CryptoLatestTradeRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoLatestTradeRequest "alpaca.data.requests.CryptoLatestTradeRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[Dict\[str, [Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\], Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_latest_trade "Permalink to this definition")

Returns the latest trade for a coin.

Parameters:

*   **request\_params** ([_CryptoLatestTradeRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoLatestTradeRequest "alpaca.data.requests.CryptoLatestTradeRequest")) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for the latest crypto trade.
    

Returns:

The latest trade in raw or wrapped format

Return type:

Union\[Dict\[str, [Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\], RawData\]

Get Crypto Latest Bar[#](#get-crypto-latest-bar "Permalink to this heading")
----------------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_latest\_bar(_request\_params: CryptoLatestBarRequest_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[Dict\[str, [Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\], Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_latest_bar "Permalink to this definition")

Returns the latest minute bar for a coin.

Parameters:

*   **request\_params** (_CryptoLatestBarRequest_) – The parameters for the request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for the latest crypto bar.
    

Returns:

The latest bar in raw or wrapped format

Return type:

Union\[Dict\[str, [Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\], RawData\]

Get Crypto Snapshot[#](#get-crypto-snapshot "Permalink to this heading")
------------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_snapshot(_request\_params: [CryptoSnapshotRequest](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoSnapshotRequest "alpaca.data.requests.CryptoSnapshotRequest")_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[[Snapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.Snapshot "alpaca.data.models.snapshots.Snapshot"), Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_snapshot "Permalink to this definition")

Returns snapshots of queried crypto symbols. Snapshots contain latest trade, latest quote, latest minute bar, latest daily bar and previous daily bar data for the queried symbols.

Parameters:

*   **request\_params** ([_CryptoSnapshotRequest_](https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html#alpaca.data.requests.CryptoSnapshotRequest "alpaca.data.requests.CryptoSnapshotRequest")) – The parameters for the snapshot request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for crypto snapshots.
    

Returns:

The snapshot data either in raw or wrapped form

Return type:

Union\[SnapshotSet, RawData\]

Get Crypto Latest Orderbook[#](#get-crypto-latest-orderbook "Permalink to this heading")
----------------------------------------------------------------------------------------

CryptoHistoricalDataClient.get\_crypto\_latest\_orderbook(_request\_params: CryptoLatestOrderbookRequest_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_) → Union\[Dict\[str, [Orderbook](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.orderbooks.Orderbook "alpaca.data.models.orderbooks.Orderbook")\], Dict\[str, Any\]\][#](#alpaca.data.historical.crypto.CryptoHistoricalDataClient.get_crypto_latest_orderbook "Permalink to this definition")

Returns the latest orderbook state for the queried crypto symbols.

Parameters:

*   **request\_params** (_CryptoOrderbookRequest_) – The parameters for the orderbook request.
    
*   **feed** ([_CryptoFeed_](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed")) – The data feed for the latest crypto orderbook.
    

Returns:

The orderbook data either in raw or wrapped form.

Return type:

Union\[Dict\[str, [Orderbook](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.orderbooks.Orderbook "alpaca.data.models.orderbooks.Orderbook")\], RawData\]</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/crypto/requests.html</url>
  <content>Toggle table of contents sidebar

BaseCryptoLatestDataRequest[#](#basecryptolatestdatarequest "Permalink to this heading")
----------------------------------------------------------------------------------------

_class_ alpaca.data.requests.BaseCryptoLatestDataRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_)[#](#alpaca.data.requests.BaseCryptoLatestDataRequest "Permalink to this definition")

A base request object for retrieving the latest data for crypto. You most likely should not use this directly and instead use the asset class specific request objects.

symbol\_or\_symbols[#](#alpaca.data.requests.BaseCryptoLatestDataRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

CryptoBarsRequest[#](#cryptobarsrequest "Permalink to this heading")
--------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoBarsRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _timeframe: [TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")_)[#](#alpaca.data.requests.CryptoBarsRequest "Permalink to this definition")

The request model for retrieving bar data for cryptocurrencies.

See BaseBarsRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoBarsRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

timeframe[#](#alpaca.data.requests.CryptoBarsRequest.timeframe "Permalink to this definition")

The period over which the bars should be aggregated. (i.e. 5 Min bars, 1 Day bars)

Type:

[TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")

start[#](#alpaca.data.requests.CryptoBarsRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.CryptoBarsRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.CryptoBarsRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.CryptoBarsRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

CryptoQuoteRequest[#](#cryptoquoterequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoQuoteRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_)[#](#alpaca.data.requests.CryptoQuoteRequest "Permalink to this definition")

This request class is used to submit a request for crypto quote data.

See BaseTimeseriesDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoQuoteRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.CryptoQuoteRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.CryptoQuoteRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.CryptoQuoteRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.CryptoQuoteRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

CryptoTradesRequest[#](#cryptotradesrequest "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoTradesRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_)[#](#alpaca.data.requests.CryptoTradesRequest "Permalink to this definition")

This request class is used to submit a request for crypto trade data.

See BaseTimeseriesDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoTradesRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.CryptoTradesRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.CryptoTradesRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.CryptoTradesRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.CryptoTradesRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

CryptoLatestQuoteRequest[#](#cryptolatestquoterequest "Permalink to this heading")
----------------------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoLatestQuoteRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_)[#](#alpaca.data.requests.CryptoLatestQuoteRequest "Permalink to this definition")

This request class is used to submit a request for the latest crypto quote data.

See BaseCryptoLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoLatestQuoteRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

CryptoLatestTradeRequest[#](#cryptolatesttraderequest "Permalink to this heading")
----------------------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoLatestTradeRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_)[#](#alpaca.data.requests.CryptoLatestTradeRequest "Permalink to this definition")

This request class is used to submit a request for the latest crypto trade data.

See BaseCryptoLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoLatestTradeRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

CryptoSnapshotRequest[#](#cryptosnapshotrequest "Permalink to this heading")
----------------------------------------------------------------------------

_class_ alpaca.data.requests.CryptoSnapshotRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_)[#](#alpaca.data.requests.CryptoSnapshotRequest "Permalink to this definition")

This request class is used to submit a request for snapshot data for crypto.

symbol\_or\_symbols[#](#alpaca.data.requests.CryptoSnapshotRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]</content>
</page>

<page>
  <title>Real-Time Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/crypto/live.html</url>
  <content>Toggle table of contents sidebar

CryptoDataStream[#](#cryptodatastream "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.data.live.crypto.CryptoDataStream(_api\_key: str_, _secret\_key: str_, _raw\_data: bool \= False_, _feed: [CryptoFeed](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.CryptoFeed "alpaca.data.enums.CryptoFeed") \= CryptoFeed.US_, _url\_override: Optional\[str\] \= None_, _websocket\_params: Optional\[Dict\] \= None_)[#](#alpaca.data.live.crypto.CryptoDataStream "Permalink to this definition")

A WebSocket client for streaming live crypto data.

_async_ close() → None[#](#alpaca.data.live.crypto.CryptoDataStream.close "Permalink to this definition")

Closes the websocket connection.

run() → None[#](#alpaca.data.live.crypto.CryptoDataStream.run "Permalink to this definition")

Starts up the websocket connection’s event loop

stop() → None[#](#alpaca.data.live.crypto.CryptoDataStream.stop "Permalink to this definition")

Stops the websocket connection.

_async_ stop\_ws() → None[#](#alpaca.data.live.crypto.CryptoDataStream.stop_ws "Permalink to this definition")

Signals websocket connection should close by adding a closing message to the stop\_stream\_queue

subscribe\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_bars "Permalink to this definition")

Subscribe to minute bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Quote_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_daily\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_daily_bars "Permalink to this definition")

Subscribe to daily bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Bar_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_orderbooks(_handler: Callable\[\[Union\[[Orderbook](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.orderbooks.Orderbook "alpaca.data.models.orderbooks.Orderbook"), Dict\]\], Awaitable\[None\]\]_, _\*symbols_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_orderbooks "Permalink to this definition")

Subscribe to orderbooks

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Bar_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_quotes(_handler: Callable\[\[Union\[[Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_quotes "Permalink to this definition")

Subscribe to quotes

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Quote_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_trades(_handler: Callable\[\[Union\[[Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_trades "Permalink to this definition")

Subscribe to trades.

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Trade_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_updated\_bars(_handler: Callable\[\[Union\[[Bar](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.subscribe_updated_bars "Permalink to this definition")

Subscribe to updated minute bars

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Bar_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

unsubscribe\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_bars "Permalink to this definition")

Unsubscribe from minute bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_daily\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_daily_bars "Permalink to this definition")

Unsubscribe from daily bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_orderbooks(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_orderbooks "Permalink to this definition")

Unsubscribe from orderbooks

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_quotes(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_quotes "Permalink to this definition")

Unsubscribe from quotes

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_trades(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_trades "Permalink to this definition")

Unsubscribe from trades

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_updated\_bars(_\*symbols: str_) → None[#](#alpaca.data.live.crypto.CryptoDataStream.unsubscribe_updated_bars "Permalink to this definition")

Unsubscribe from updated bars

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.</content>
</page>

<page>
  <title>Option Market Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/option.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Historical Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/option/historical.html</url>
  <content>Toggle table of contents sidebar

OptionHistoricalDataClient[#](#optionhistoricaldataclient "Permalink to this heading")
--------------------------------------------------------------------------------------

_class_ alpaca.data.historical.option.OptionHistoricalDataClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _sandbox: bool \= False_)[#](#alpaca.data.historical.option.OptionHistoricalDataClient "Permalink to this definition")

The REST client for interacting with Alpaca Market Data API option data endpoints.

Learn more on [https://docs.alpaca.markets/docs/about-market-data-api](https://docs.alpaca.markets/docs/about-market-data-api)

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _use\_basic\_auth: bool \= False_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_, _sandbox: bool \= False_) → None[#](#alpaca.data.historical.option.OptionHistoricalDataClient.__init__ "Permalink to this definition")

Instantiates a Historical Data Client.

Parameters:

*   **api\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API key. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]__,_ _optional_) – Alpaca API secret key. Defaults to None.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token if authenticating via OAuth. Defaults to None.
    
*   **use\_basic\_auth** (_bool__,_ _optional_) – If true, API requests will use basic authorization headers. Set to true if using broker api sandbox credentials
    
*   **raw\_data** (_bool__,_ _optional_) – If true, API responses will not be wrapped and raw responses will be returned from methods. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]__,_ _optional_) – If specified allows you to override the base url the client points to for proxy/testing.
    
*   **sandbox** (_bool_) – True if using sandbox mode. Defaults to False.
    

Get Option Bars[#](#get-option-bars "Permalink to this heading")
----------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_bars(_request\_params: [OptionBarsRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionBarsRequest "alpaca.data.requests.OptionBarsRequest")_) → Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_bars "Permalink to this definition")

Returns bar data for an option contract or list of option contracts over a given time period and timeframe.

Parameters:

**request\_params** ([_OptionBarsRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionBarsRequest "alpaca.data.requests.OptionBarsRequest")) – The request object for retrieving option bar data.

Returns:

The bar data either in raw or wrapped form

Return type:

Union\[[BarSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.bars.BarSet "alpaca.data.models.bars.BarSet"), RawData\]

Get Option Trades[#](#get-option-trades "Permalink to this heading")
--------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_trades(_request\_params: [OptionTradesRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionTradesRequest "alpaca.data.requests.OptionTradesRequest")_) → Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_trades "Permalink to this definition")

The historical option trades API provides trade data for a list of contract symbols between the specified dates up to 7 days ago.

Parameters:

**request\_params** ([_OptionTradesRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionTradesRequest "alpaca.data.requests.OptionTradesRequest")) – The request object for retrieving option trade data.

Returns:

The trade data either in raw or wrapped form

Return type:

Union\[[TradeSet](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.TradeSet "alpaca.data.models.trades.TradeSet"), RawData\]

Get Option Exchange Codes[#](#get-option-exchange-codes "Permalink to this heading")
------------------------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_exchange\_codes() → Dict\[str, Any\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_exchange_codes "Permalink to this definition")

Returns the mapping between the option exchange codes and the corresponding exchanges names.

Parameters:

**None** –

Returns:

The mapping between the option exchange codes and the corresponding exchanges names.

Return type:

RawData

Get Option Latest Quote[#](#get-option-latest-quote "Permalink to this heading")
--------------------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_latest\_quote(_request\_params: [OptionLatestQuoteRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionLatestQuoteRequest "alpaca.data.requests.OptionLatestQuoteRequest")_) → Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_latest_quote "Permalink to this definition")

Retrieves the latest quote for an option symbol or list of option symbols.

Parameters:

**request\_params** ([_OptionLatestQuoteRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionLatestQuoteRequest "alpaca.data.requests.OptionLatestQuoteRequest")) – The request object for retrieving the latest quote data.

Returns:

The latest quote in raw or wrapped format

Return type:

Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], RawData\]

Get Option Latest Trade[#](#get-option-latest-trade "Permalink to this heading")
--------------------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_latest\_trade(_request\_params: [OptionLatestTradeRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionLatestTradeRequest "alpaca.data.requests.OptionLatestTradeRequest")_) → Union\[Dict\[str, [Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\], Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_latest_trade "Permalink to this definition")

Retrieves the latest trade for an option symbol or list of option symbols.

Parameters:

**request\_params** ([_OptionLatestQuoteRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionLatestQuoteRequest "alpaca.data.requests.OptionLatestQuoteRequest")) – The request object for retrieving the latest quote data.

Returns:

The latest quote in raw or wrapped format

Return type:

Union\[Dict\[str, [Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\], RawData\]

Get Option Snapshot[#](#get-option-snapshot "Permalink to this heading")
------------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_snapshot(_request\_params: [OptionSnapshotRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionSnapshotRequest "alpaca.data.requests.OptionSnapshotRequest")_) → Union\[Dict\[str, [OptionsSnapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.OptionsSnapshot "alpaca.data.models.snapshots.OptionsSnapshot")\], Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_snapshot "Permalink to this definition")

Returns snapshots of queried symbols. OptionsSnapshot contain latest trade, latest quote, implied volatility, and greeks for the queried symbols.

Parameters:

**request\_params** ([_OptionSnapshotRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionSnapshotRequest "alpaca.data.requests.OptionSnapshotRequest")) – The request object for retrieving snapshot data.

Returns:

The snapshot data either in raw or wrapped form

Return type:

Union\[Dict\[str, [OptionsSnapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.OptionsSnapshot "alpaca.data.models.snapshots.OptionsSnapshot")\], RawData\]

Get Option Chain[#](#get-option-chain "Permalink to this heading")
------------------------------------------------------------------

OptionHistoricalDataClient.get\_option\_chain(_request\_params: [OptionChainRequest](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionChainRequest "alpaca.data.requests.OptionChainRequest")_) → Union\[Dict\[str, [OptionsSnapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.OptionsSnapshot "alpaca.data.models.snapshots.OptionsSnapshot")\], Dict\[str, Any\]\][#](#alpaca.data.historical.option.OptionHistoricalDataClient.get_option_chain "Permalink to this definition")

The option chain endpoint for underlying symbol provides the latest trade, latest quote, implied volatility, and greeks for each contract symbol of the underlying symbol.

Parameters:

**request\_params** ([_OptionChainRequest_](https://alpaca.markets/sdks/python/api_reference/data/option/requests.html#alpaca.data.requests.OptionChainRequest "alpaca.data.requests.OptionChainRequest")) – The request object for retrieving snapshot data.

Returns:

The snapshot data either in raw or wrapped form

Return type:

Union\[Dict\[str, [OptionsSnapshot](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.snapshots.OptionsSnapshot "alpaca.data.models.snapshots.OptionsSnapshot")\], RawData\]</content>
</page>

<page>
  <title>Real-Time Data - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/option/live.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

OptionDataStream[#](#optiondatastream "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.data.live.option.OptionDataStream(_api\_key: str_, _secret\_key: str_, _raw\_data: bool \= False_, _feed: OptionsFeed \= OptionsFeed.INDICATIVE_, _websocket\_params: Optional\[Dict\] \= None_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.data.live.option.OptionDataStream "Permalink to this definition")

A WebSocket client for streaming live option data.

_async_ close() → None[#](#alpaca.data.live.option.OptionDataStream.close "Permalink to this definition")

Closes the websocket connection.

run() → None[#](#alpaca.data.live.option.OptionDataStream.run "Permalink to this definition")

Starts up the websocket connection’s event loop

stop() → None[#](#alpaca.data.live.option.OptionDataStream.stop "Permalink to this definition")

Stops the websocket connection.

_async_ stop\_ws() → None[#](#alpaca.data.live.option.OptionDataStream.stop_ws "Permalink to this definition")

Signals websocket connection should close by adding a closing message to the stop\_stream\_queue

subscribe\_quotes(_handler: Callable\[\[Union\[[Quote](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.option.OptionDataStream.subscribe_quotes "Permalink to this definition")

Subscribe to quotes

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Quote_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

subscribe\_trades(_handler: Callable\[\[Union\[[Trade](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade"), Dict\]\], Awaitable\[None\]\]_, _\*symbols: str_) → None[#](#alpaca.data.live.option.OptionDataStream.subscribe_trades "Permalink to this definition")

Subscribe to trades.

Parameters:

*   **handler** (_Callable__\[__\[__Union__\[_[_Trade_](https://alpaca.markets/sdks/python/api_reference/data/models.html#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")_,_ _Dict__\]__\]__,_ _Awaitable__\[__None__\]__\]_) – The coroutine callback function to handle the incoming data.
    
*   **\*symbols** – List of ticker symbols to subscribe to. “\*” for everything.
    

unsubscribe\_quotes(_\*symbols: str_) → None[#](#alpaca.data.live.option.OptionDataStream.unsubscribe_quotes "Permalink to this definition")

Unsubscribe from quotes

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.

unsubscribe\_trades(_\*symbols: str_) → None[#](#alpaca.data.live.option.OptionDataStream.unsubscribe_trades "Permalink to this definition")

Unsubscribe from trades

Parameters:

**\*symbols** (_str_) – List of ticker symbols to unsubscribe from. “\*” for everything.</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/option/requests.html</url>
  <content>Toggle table of contents sidebar

BaseOptionLatestDataRequest[#](#baseoptionlatestdatarequest "Permalink to this heading")
----------------------------------------------------------------------------------------

_class_ alpaca.data.requests.BaseOptionLatestDataRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[OptionsFeed\] \= None_)[#](#alpaca.data.requests.BaseOptionLatestDataRequest "Permalink to this definition")

A base request object for retrieving the latest data for options. You most likely should not use this directly and instead use the asset class specific request objects.

symbol\_or\_symbols[#](#alpaca.data.requests.BaseOptionLatestDataRequest.symbol_or_symbols "Permalink to this definition")

The option identifier or list of option identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.BaseOptionLatestDataRequest.feed "Permalink to this definition")

The source feed of the data. opra or indicative. Default: opra if the user has the options subscription, indicative otherwise.

Type:

Optional\[OptionsFeed\]

OptionBarsRequest[#](#optionbarsrequest "Permalink to this heading")
--------------------------------------------------------------------

_class_ alpaca.data.requests.OptionBarsRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_, _timeframe: [TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")_)[#](#alpaca.data.requests.OptionBarsRequest "Permalink to this definition")

The request model for retrieving bar data for option contracts.

See BaseBarsRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.OptionBarsRequest.symbol_or_symbols "Permalink to this definition")

The ticker identifier or list of ticker identifiers.

Type:

Union\[str, List\[str\]\]

timeframe[#](#alpaca.data.requests.OptionBarsRequest.timeframe "Permalink to this definition")

The length of time (also known as time interval) for which each Bar represents (i.e. 5 Min bars, 1 Day bars).

Type:

[TimeFrame](https://alpaca.markets/sdks/python/api_reference/data/timeframe.html#alpaca.data.timeframe.TimeFrame "alpaca.data.timeframe.TimeFrame")

start[#](#alpaca.data.requests.OptionBarsRequest.start "Permalink to this definition")

The beginning of the time period for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.OptionBarsRequest.end "Permalink to this definition")

The end of the time period for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.OptionBarsRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.OptionBarsRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

OptionTradesRequest[#](#optiontradesrequest "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.data.requests.OptionTradesRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _start: Optional\[datetime\] \= None_, _end: Optional\[datetime\] \= None_, _limit: Optional\[int\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _sort: Optional\[Sort\] \= None_)[#](#alpaca.data.requests.OptionTradesRequest "Permalink to this definition")

This request class is used to submit a request for option trade data.

See BaseTimeseriesDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.OptionTradesRequest.symbol_or_symbols "Permalink to this definition")

The option identifier or list of option identifiers.

Type:

Union\[str, List\[str\]\]

start[#](#alpaca.data.requests.OptionTradesRequest.start "Permalink to this definition")

The beginning of the time interval for desired data. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

end[#](#alpaca.data.requests.OptionTradesRequest.end "Permalink to this definition")

The end of the time interval for desired data. Defaults to now. Timezone naive inputs assumed to be in UTC.

Type:

Optional\[datetime\]

limit[#](#alpaca.data.requests.OptionTradesRequest.limit "Permalink to this definition")

Upper limit of number of data points to return. Defaults to None.

Type:

Optional\[int\]

sort[#](#alpaca.data.requests.OptionTradesRequest.sort "Permalink to this definition")

The chronological order of response based on the timestamp. Defaults to ASC.

Type:

Optional\[Sort\]

OptionLatestQuoteRequest[#](#optionlatestquoterequest "Permalink to this heading")
----------------------------------------------------------------------------------

_class_ alpaca.data.requests.OptionLatestQuoteRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[OptionsFeed\] \= None_)[#](#alpaca.data.requests.OptionLatestQuoteRequest "Permalink to this definition")

This request class is used to submit a request for the latest option quote data.

See BaseOptionLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.OptionLatestQuoteRequest.symbol_or_symbols "Permalink to this definition")

The option identifier or list of option identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.OptionLatestQuoteRequest.feed "Permalink to this definition")

The source feed of the data. opra or indicative. Default: opra if the user has the options subscription, indicative otherwise.

Type:

Optional\[OptionsFeed\]

OptionLatestTradeRequest[#](#optionlatesttraderequest "Permalink to this heading")
----------------------------------------------------------------------------------

_class_ alpaca.data.requests.OptionLatestTradeRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[OptionsFeed\] \= None_)[#](#alpaca.data.requests.OptionLatestTradeRequest "Permalink to this definition")

This request class is used to submit a request for the latest option trade data.

See BaseOptionLatestDataRequest for more information on available parameters.

symbol\_or\_symbols[#](#alpaca.data.requests.OptionLatestTradeRequest.symbol_or_symbols "Permalink to this definition")

The option identifier or list of option identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.OptionLatestTradeRequest.feed "Permalink to this definition")

The source feed of the data. opra or indicative. Default: opra if the user has the options subscription, indicative otherwise.

Type:

Optional\[OptionsFeed\]

OptionSnapshotRequest[#](#optionsnapshotrequest "Permalink to this heading")
----------------------------------------------------------------------------

_class_ alpaca.data.requests.OptionSnapshotRequest(_\*_, _symbol\_or\_symbols: Union\[str, List\[str\]\]_, _feed: Optional\[OptionsFeed\] \= None_)[#](#alpaca.data.requests.OptionSnapshotRequest "Permalink to this definition")

This request class is used to submit a request for snapshot data for options.

symbol\_or\_symbols[#](#alpaca.data.requests.OptionSnapshotRequest.symbol_or_symbols "Permalink to this definition")

The option identifier or list of option identifiers.

Type:

Union\[str, List\[str\]\]

feed[#](#alpaca.data.requests.OptionSnapshotRequest.feed "Permalink to this definition")

The source feed of the data. opra or indicative. Default: opra if the user has the options subscription, indicative otherwise.

Type:

Optional\[OptionsFeed\]

OptionChainRequest[#](#optionchainrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.data.requests.OptionChainRequest(_\*_, _underlying\_symbol: str_, _feed: Optional\[OptionsFeed\] \= None_, _type: Optional\[ContractType\] \= None_, _strike\_price\_gte: Optional\[float\] \= None_, _strike\_price\_lte: Optional\[float\] \= None_, _expiration\_date: Optional\[Union\[date, str\]\] \= None_, _expiration\_date\_gte: Optional\[Union\[date, str\]\] \= None_, _expiration\_date\_lte: Optional\[Union\[date, str\]\] \= None_, _root\_symbol: Optional\[str\] \= None_, _updated\_since: Optional\[datetime\] \= None_)[#](#alpaca.data.requests.OptionChainRequest "Permalink to this definition")

This request class is used to submit a request for option chain data for options.

underlying\_symbol[#](#alpaca.data.requests.OptionChainRequest.underlying_symbol "Permalink to this definition")

The underlying\_symbol for option contracts.

Type:

str

feed[#](#alpaca.data.requests.OptionChainRequest.feed "Permalink to this definition")

The source feed of the data. opra or indicative. Default: opra if the user has the options subscription, indicative otherwise.

Type:

Optional\[OptionsFeed\]

type[#](#alpaca.data.requests.OptionChainRequest.type "Permalink to this definition")

Filter contracts by the type (call or put).

Type:

Optional\[ContractType\]

strike\_price\_gte[#](#alpaca.data.requests.OptionChainRequest.strike_price_gte "Permalink to this definition")

Filter contracts with strike price greater than or equal to the specified value.

Type:

Optional\[float\]

strike\_price\_lte[#](#alpaca.data.requests.OptionChainRequest.strike_price_lte "Permalink to this definition")

Filter contracts with strike price less than or equal to the specified value.

Type:

Optional\[float\]

expiration\_date[#](#alpaca.data.requests.OptionChainRequest.expiration_date "Permalink to this definition")

Filter contracts by the exact expiration date (format: YYYY-MM-DD).

Type:

Optional\[Union\[date, str\]\]

expiration\_date\_gte[#](#alpaca.data.requests.OptionChainRequest.expiration_date_gte "Permalink to this definition")

Filter contracts with expiration date greater than or equal to the specified date.

Type:

Optional\[Union\[date, str\]\]

expiration\_date\_lte[#](#alpaca.data.requests.OptionChainRequest.expiration_date_lte "Permalink to this definition")

Filter contracts with expiration date less than or equal to the specified date.

Type:

Optional\[Union\[date, str\]\]

root\_symbol[#](#alpaca.data.requests.OptionChainRequest.root_symbol "Permalink to this definition")

Filter contracts by the root symbol.

Type:

Optional\[str\]

updated\_since[#](#alpaca.data.requests.OptionChainRequest.updated_since "Permalink to this definition")

Filter to snapshots that were updated since this timestamp.

Type:

Optional\[datetime\]</content>
</page>

<page>
  <title>TimeFrame - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/timeframe.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

TimeFrameUnit[#](#timeframeunit "Permalink to this heading")
------------------------------------------------------------

_enum_ alpaca.data.timeframe.TimeFrameUnit(_value_)[#](#alpaca.data.timeframe.TimeFrameUnit "Permalink to this definition")

Quantity of time used as unit

Member Type:

`str`

Valid values are as follows:

Minute_: str_ _\= <TimeFrameUnit.Minute: 'Min'>_[#](#alpaca.data.timeframe.TimeFrameUnit.Minute "Permalink to this definition")

Hour_: str_ _\= <TimeFrameUnit.Hour: 'Hour'>_[#](#alpaca.data.timeframe.TimeFrameUnit.Hour "Permalink to this definition")

Day_: str_ _\= <TimeFrameUnit.Day: 'Day'>_[#](#alpaca.data.timeframe.TimeFrameUnit.Day "Permalink to this definition")

Week_: str_ _\= <TimeFrameUnit.Week: 'Week'>_[#](#alpaca.data.timeframe.TimeFrameUnit.Week "Permalink to this definition")

Month_: str_ _\= <TimeFrameUnit.Month: 'Month'>_[#](#alpaca.data.timeframe.TimeFrameUnit.Month "Permalink to this definition")

TimeFrame[#](#id1 "Permalink to this heading")
----------------------------------------------

_class_ alpaca.data.timeframe.TimeFrame(_amount_, _unit_)[#](#alpaca.data.timeframe.TimeFrame "Permalink to this definition")

A time interval specified in multiples of defined units (minute, day, etc)

amount\_value[#](#alpaca.data.timeframe.TimeFrame.amount_value "Permalink to this definition")

The number of multiples of the TimeFrameUnit interval

Type:

int

unit\_value[#](#alpaca.data.timeframe.TimeFrame.unit_value "Permalink to this definition")

The base unit of time interval that is used to measure the TimeFrame

Type:

[TimeFrameUnit](#alpaca.data.timeframe.TimeFrameUnit "alpaca.data.timeframe.TimeFrameUnit")

Raises:

**ValueError** – Raised if the amount\_value and unit\_value are not consistent with each other

Day _\= <alpaca.data.timeframe.TimeFrame object>_[#](#alpaca.data.timeframe.TimeFrame.Day "Permalink to this definition")

Hour _\= <alpaca.data.timeframe.TimeFrame object>_[#](#alpaca.data.timeframe.TimeFrame.Hour "Permalink to this definition")

Minute _\= <alpaca.data.timeframe.TimeFrame object>_[#](#alpaca.data.timeframe.TimeFrame.Minute "Permalink to this definition")

Month _\= <alpaca.data.timeframe.TimeFrame object>_[#](#alpaca.data.timeframe.TimeFrame.Month "Permalink to this definition")

Week _\= <alpaca.data.timeframe.TimeFrame object>_[#](#alpaca.data.timeframe.TimeFrame.Week "Permalink to this definition")</content>
</page>

<page>
  <title>Models - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/models.html</url>
  <content>Toggle table of contents sidebar

Bar[#](#bar "Permalink to this heading")
----------------------------------------

_class_ alpaca.data.models.bars.Bar(_symbol: str_, _raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.bars.Bar "Permalink to this definition")

Represents one bar/candlestick of aggregated trade data over a specified interval.

symbol[#](#alpaca.data.models.bars.Bar.symbol "Permalink to this definition")

The ticker identifier for the security whose data forms the bar.

Type:

str

timestamp[#](#alpaca.data.models.bars.Bar.timestamp "Permalink to this definition")

The opening timestamp of the bar.

Type:

datetime

open[#](#alpaca.data.models.bars.Bar.open "Permalink to this definition")

The opening price of the interval.

Type:

float

high[#](#alpaca.data.models.bars.Bar.high "Permalink to this definition")

The high price during the interval.

Type:

float

low[#](#alpaca.data.models.bars.Bar.low "Permalink to this definition")

The low price during the interval.

Type:

float

close[#](#alpaca.data.models.bars.Bar.close "Permalink to this definition")

The closing price of the interval.

Type:

float

volume[#](#alpaca.data.models.bars.Bar.volume "Permalink to this definition")

The volume traded over the interval.

Type:

float

trade\_count[#](#alpaca.data.models.bars.Bar.trade_count "Permalink to this definition")

The number of trades that occurred.

Type:

Optional\[float\]

vwap[#](#alpaca.data.models.bars.Bar.vwap "Permalink to this definition")

The volume weighted average price.

Type:

Optional\[float\]

exchange[#](#alpaca.data.models.bars.Bar.exchange "Permalink to this definition")

The exchange the bar was formed on.

Type:

Optional\[float\]

BarSet[#](#barset "Permalink to this heading")
----------------------------------------------

_class_ alpaca.data.models.bars.BarSet(_raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.bars.BarSet "Permalink to this definition")

A collection of Bars.

data[#](#alpaca.data.models.bars.BarSet.data "Permalink to this definition")

The collection of Bars keyed by symbol.

Type:

Dict\[str, List\[[Bar](#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\]\]

* * *

Quote[#](#quote "Permalink to this heading")
--------------------------------------------

_class_ alpaca.data.models.quotes.Quote(_symbol: str_, _raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.quotes.Quote "Permalink to this definition")

Level 1 ask/bid pair quote data. Contains information about size and origin exchange.

symbol[#](#alpaca.data.models.quotes.Quote.symbol "Permalink to this definition")

The ticker identifier for the security whose data forms the quote.

Type:

str

timestamp[#](#alpaca.data.models.quotes.Quote.timestamp "Permalink to this definition")

The time of submission of the quote.

Type:

datetime

bid\_price[#](#alpaca.data.models.quotes.Quote.bid_price "Permalink to this definition")

The bidding price of the quote.

Type:

float

bid\_size[#](#alpaca.data.models.quotes.Quote.bid_size "Permalink to this definition")

The size of the quote bid.

Type:

float

bid\_exchange[#](#alpaca.data.models.quotes.Quote.bid_exchange "Permalink to this definition")

The exchange the quote bid originates. Defaults to None.

Type:

Optional\[Union\[str, [Exchange](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.Exchange "alpaca.data.enums.Exchange")\]\]

ask\_price[#](#alpaca.data.models.quotes.Quote.ask_price "Permalink to this definition")

The asking price of the quote.

Type:

float

ask\_size[#](#alpaca.data.models.quotes.Quote.ask_size "Permalink to this definition")

The size of the quote ask.

Type:

float

ask\_exchange[#](#alpaca.data.models.quotes.Quote.ask_exchange "Permalink to this definition")

The exchange the quote ask originates. Defaults to None.

Type:

Optional\[Union\[str, [Exchange](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.Exchange "alpaca.data.enums.Exchange")\]\]

conditions[#](#alpaca.data.models.quotes.Quote.conditions "Permalink to this definition")

The quote conditions. Defaults to None.

Type:

Optional\[Union\[List\[str\], str\]\]

tape[#](#alpaca.data.models.quotes.Quote.tape "Permalink to this definition")

The quote tape. Defaults to None.

Type:

Optional\[str\]

QuoteSet[#](#quoteset "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.data.models.quotes.QuoteSet(_raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.quotes.QuoteSet "Permalink to this definition")

A collection of Quotes.

data[#](#alpaca.data.models.quotes.QuoteSet.data "Permalink to this definition")

The collection of Quotes keyed by symbol.

Type:

Dict\[str, List\[[Quote](#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\]\]

* * *

Trade[#](#trade "Permalink to this heading")
--------------------------------------------

_class_ alpaca.data.models.trades.Trade(_symbol: str_, _raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.trades.Trade "Permalink to this definition")

A transaction from the price and sales history of a security.

symbol[#](#alpaca.data.models.trades.Trade.symbol "Permalink to this definition")

The ticker identifier for the security whose data forms the trade.

Type:

str

timestamp[#](#alpaca.data.models.trades.Trade.timestamp "Permalink to this definition")

The time of submission of the trade.

Type:

datetime

exchange[#](#alpaca.data.models.trades.Trade.exchange "Permalink to this definition")

The exchange the trade occurred.

Type:

Optional\[[Exchange](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.Exchange "alpaca.data.enums.Exchange")\]

price[#](#alpaca.data.models.trades.Trade.price "Permalink to this definition")

The price that the transaction occurred at.

Type:

float

size[#](#alpaca.data.models.trades.Trade.size "Permalink to this definition")

The quantity traded

Type:

float

id[#](#alpaca.data.models.trades.Trade.id "Permalink to this definition")

The trade ID

Type:

Optional\[int\]

conditions[#](#alpaca.data.models.trades.Trade.conditions "Permalink to this definition")

The trade conditions. Defaults to None.

Type:

Optional\[Union\[List\[str\], str\]\]

tape[#](#alpaca.data.models.trades.Trade.tape "Permalink to this definition")

The trade tape. Defaults to None.

Type:

Optional\[str\]

TradeSet[#](#tradeset "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.data.models.trades.TradeSet(_raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.trades.TradeSet "Permalink to this definition")

A collection of Trade objects.

data[#](#alpaca.data.models.trades.TradeSet.data "Permalink to this definition")

The collection of Trades keyed by symbol.

Type:

Dict\[str, List\[[Trade](#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\]\]\]

* * *

Snapshot[#](#snapshot "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.data.models.snapshots.Snapshot(_symbol: str_, _raw\_data: Dict\[str, Dict\[str, Any\]\]_)[#](#alpaca.data.models.snapshots.Snapshot "Permalink to this definition")

A Snapshot contains the latest trade, latest quote, minute bar daily bar and previous daily bar data for a given ticker symbol.

symbol[#](#alpaca.data.models.snapshots.Snapshot.symbol "Permalink to this definition")

The identifier for the snapshot security.

Type:

str

latest\_trade[#](#alpaca.data.models.snapshots.Snapshot.latest_trade "Permalink to this definition")

The latest transaction on the price and sales tape

Type:

Optional\[[Trade](#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\]

latest\_quote[#](#alpaca.data.models.snapshots.Snapshot.latest_quote "Permalink to this definition")

Level 1 ask/bid pair quote data.

Type:

Optional\[[Quote](#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\]

minute\_bar[#](#alpaca.data.models.snapshots.Snapshot.minute_bar "Permalink to this definition")

The latest minute OHLC bar data

Type:

Optional\[[Bar](#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\]

daily\_bar[#](#alpaca.data.models.snapshots.Snapshot.daily_bar "Permalink to this definition")

The latest daily OHLC bar data

Type:

Optional\[[Bar](#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\]

previous\_daily\_bar[#](#alpaca.data.models.snapshots.Snapshot.previous_daily_bar "Permalink to this definition")

The 2nd to latest (2 trading days ago) daily OHLC bar data

Type:

Optional\[[Bar](#alpaca.data.models.bars.Bar "alpaca.data.models.bars.Bar")\]

OptionsGreeks[#](#optionsgreeks "Permalink to this heading")
------------------------------------------------------------

_class_ alpaca.data.models.snapshots.OptionsGreeks(_raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.snapshots.OptionsGreeks "Permalink to this definition")

Options Greeks are a set of risk measures that are used in the options market to evaluate the risk and reward of an option.

delta[#](#alpaca.data.models.snapshots.OptionsGreeks.delta "Permalink to this definition")

The rate of change of an option’s price relative to a change in the price of the underlying asset.

Type:

float

gamma[#](#alpaca.data.models.snapshots.OptionsGreeks.gamma "Permalink to this definition")

The rate of change in an option’s delta relative to a change in the price of the underlying asset.

Type:

float

rho[#](#alpaca.data.models.snapshots.OptionsGreeks.rho "Permalink to this definition")

The rate of change in an option’s price relative to a change in the risk-free rate of interest.

Type:

float

theta[#](#alpaca.data.models.snapshots.OptionsGreeks.theta "Permalink to this definition")

The rate of change in an option’s price relative to a change in time.

Type:

float

vega[#](#alpaca.data.models.snapshots.OptionsGreeks.vega "Permalink to this definition")

The rate of change in an option’s price relative to a change in the volatility of the underlying asset.

Type:

float

OptionsSnapshot[#](#optionssnapshot "Permalink to this heading")
----------------------------------------------------------------

_class_ alpaca.data.models.snapshots.OptionsSnapshot(_symbol: str_, _raw\_data: Dict\[str, Dict\[str, Any\]\]_)[#](#alpaca.data.models.snapshots.OptionsSnapshot "Permalink to this definition")

An options snapshot contains the latest trade, latest quote, greeks and implied volatility data for a given symbol.

symbol[#](#alpaca.data.models.snapshots.OptionsSnapshot.symbol "Permalink to this definition")

The identifier for the snapshot security.

Type:

str

latest\_trade[#](#alpaca.data.models.snapshots.OptionsSnapshot.latest_trade "Permalink to this definition")

The latest transaction on the price and sales tape

Type:

Optional\[[Trade](#alpaca.data.models.trades.Trade "alpaca.data.models.trades.Trade")\]

latest\_quote[#](#alpaca.data.models.snapshots.OptionsSnapshot.latest_quote "Permalink to this definition")

Level 1 ask/bid pair quote data.

Type:

Optional\[[Quote](#alpaca.data.models.quotes.Quote "alpaca.data.models.quotes.Quote")\]

implied\_volatility[#](#alpaca.data.models.snapshots.OptionsSnapshot.implied_volatility "Permalink to this definition")

The implied volatility of the option

Type:

Optional\[float\]

greeks[#](#alpaca.data.models.snapshots.OptionsSnapshot.greeks "Permalink to this definition")

The option greeks data

Type:

Optional\[OptionGreeks\]

* * *

Orderbook[#](#orderbook "Permalink to this heading")
----------------------------------------------------

_class_ alpaca.data.models.orderbooks.Orderbook(_symbol: str_, _raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.orderbooks.Orderbook "Permalink to this definition")

Level 2 ask/bid pair orderbook data.

symbol[#](#alpaca.data.models.orderbooks.Orderbook.symbol "Permalink to this definition")

The ticker identifier for the security whose data forms the orderbook.

Type:

str

timestamp[#](#alpaca.data.models.orderbooks.Orderbook.timestamp "Permalink to this definition")

The time of submission of the orderbook.

Type:

datetime

bids[#](#alpaca.data.models.orderbooks.Orderbook.bids "Permalink to this definition")

The list of bid quotes for the orderbook

Type:

List\[[OrderbookQuote](#alpaca.data.models.orderbooks.OrderbookQuote "alpaca.data.models.orderbooks.OrderbookQuote")\]

asks[#](#alpaca.data.models.orderbooks.Orderbook.asks "Permalink to this definition")

The list of ask quotes for the orderbook

Type:

List\[[OrderbookQuote](#alpaca.data.models.orderbooks.OrderbookQuote "alpaca.data.models.orderbooks.OrderbookQuote")\]

reset[#](#alpaca.data.models.orderbooks.Orderbook.reset "Permalink to this definition")

if true, the orderbook message contains the whole server side orderbook.

Type:

bool

This indicates to the client that they should reset their orderbook.

Typically sent as the first message after subscription.

OrderbookQuote[#](#orderbookquote "Permalink to this heading")
--------------------------------------------------------------

_class_ alpaca.data.models.orderbooks.OrderbookQuote(_\*_, _p: float_, _s: float_)[#](#alpaca.data.models.orderbooks.OrderbookQuote "Permalink to this definition")

A single bid or ask quote in the orderbook

* * *

ActiveStock[#](#activestock "Permalink to this heading")
--------------------------------------------------------

_class_ alpaca.data.models.screener.ActiveStock(_\*_, _symbol: str_, _volume: float_, _trade\_count: float_)[#](#alpaca.data.models.screener.ActiveStock "Permalink to this definition")

Represent one asset that was a most active on the most actives endpoint.

symbol[#](#alpaca.data.models.screener.ActiveStock.symbol "Permalink to this definition")

Symbol of market moving asset.

Type:

str

volume[#](#alpaca.data.models.screener.ActiveStock.volume "Permalink to this definition")

Cumulative volume for the current trading day.

Type:

float

trade\_count[#](#alpaca.data.models.screener.ActiveStock.trade_count "Permalink to this definition")

Cumulative trade count for the current trading day.

Type:

float

MostActives[#](#mostactives "Permalink to this heading")
--------------------------------------------------------

_class_ alpaca.data.models.screener.MostActives(_\*_, _most\_actives: List\[[ActiveStock](#alpaca.data.models.screener.ActiveStock "alpaca.data.models.screener.ActiveStock")\]_, _last\_updated: datetime_)[#](#alpaca.data.models.screener.MostActives "Permalink to this definition")

Represent the response model for the MostActives endpoint. .. attribute:: most\_actives

> list of top N most active symbols.
> 
> type:
> 
> List\[ActiveStock\]

last\_updated[#](#alpaca.data.models.screener.MostActives.last_updated "Permalink to this definition")

Time when the MostActives were last computed. Formatted as a RFC 3339 formatted datetime with nanosecond precision.

Type:

datetime

Mover[#](#mover "Permalink to this heading")
--------------------------------------------

_class_ alpaca.data.models.screener.Mover(_\*_, _symbol: str_, _percent\_change: float_, _change: float_, _price: float_)[#](#alpaca.data.models.screener.Mover "Permalink to this definition")

Represent one asset that was a top mover on the top market movers endpoint. .. attribute:: symbol

> Symbol of market moving asset.
> 
> type:
> 
> str

percent\_change[#](#alpaca.data.models.screener.Mover.percent_change "Permalink to this definition")

Percentage difference change for the day.

Type:

float

change[#](#alpaca.data.models.screener.Mover.change "Permalink to this definition")

Difference in change for the day.

Type:

float

price[#](#alpaca.data.models.screener.Mover.price "Permalink to this definition")

Current price of market moving asset.

Type:

float

Movers[#](#movers "Permalink to this heading")
----------------------------------------------

_class_ alpaca.data.models.screener.Movers(_\*_, _gainers: List\[[Mover](#alpaca.data.models.screener.Mover "alpaca.data.models.screener.Mover")\]_, _losers: List\[[Mover](#alpaca.data.models.screener.Mover "alpaca.data.models.screener.Mover")\]_, _market\_type: [MarketType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MarketType "alpaca.data.enums.MarketType")_, _last\_updated: datetime_)[#](#alpaca.data.models.screener.Movers "Permalink to this definition")

Represent the response model for the top market movers endpoint. .. attribute:: gainers

> list of top N gainers.
> 
> type:
> 
> List\[Mover\]

losers[#](#alpaca.data.models.screener.Movers.losers "Permalink to this definition")

list of top N losers.

Type:

List\[[Mover](#alpaca.data.models.screener.Mover "alpaca.data.models.screener.Mover")\]

market\_type[#](#alpaca.data.models.screener.Movers.market_type "Permalink to this definition")

Market type (stocks or crypto).

Type:

[MarketType](https://alpaca.markets/sdks/python/api_reference/data/enums.html#alpaca.data.enums.MarketType "alpaca.data.enums.MarketType")

last\_updated[#](#alpaca.data.models.screener.Movers.last_updated "Permalink to this definition")

Time when the movers were last computed. Formatted as a RFC 3339 formatted datetime with nanosecond precision.

Type:

datetime

CorporateAction[#](#corporateaction "Permalink to this heading")
----------------------------------------------------------------

alpaca.data.models.corporate\_actions.CorporateAction[#](#alpaca.data.models.corporate_actions.CorporateAction "Permalink to this definition")

alias of `Union`\[`ForwardSplit`, `ReverseSplit`, `UnitSplit`, `StockDividend`, `CashDividend`, `SpinOff`, `CashMerger`, `StockMerger`, `StockAndCashMerger`, `Redemption`, `NameChange`, `WorthlessRemoval`, `RightsDistribution`\]

CorporateActionsSet[#](#corporateactionsset "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.data.models.corporate\_actions.CorporateActionsSet(_raw\_data: Dict\[str, Any\]_)[#](#alpaca.data.models.corporate_actions.CorporateActionsSet "Permalink to this definition")

A collection of Corporate actions. ref. [https://docs.alpaca.markets/reference/corporateactions-1](https://docs.alpaca.markets/reference/corporateactions-1)

data[#](#alpaca.data.models.corporate_actions.CorporateActionsSet.data "Permalink to this definition")

The collection of corporate actions.

Type:

Dict\[str, List\[CorporateAction\]\]</content>
</page>

<page>
  <title>Trading Reference - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading_api.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Enums - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/data/enums.html</url>
  <content>Toggle table of contents sidebar

Exchange[#](#exchange "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.data.enums.Exchange(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.Exchange "Permalink to this definition")

The exchanges that provide data feeds to Alpaca.

Z[#](#alpaca.data.enums.Exchange.Z "Permalink to this definition")

Cboe BZ

Type:

str

I[#](#alpaca.data.enums.Exchange.I "Permalink to this definition")

International Securities Exchange

Type:

str

M[#](#alpaca.data.enums.Exchange.M "Permalink to this definition")

Chicago Stock Exchange

Type:

str

U[#](#alpaca.data.enums.Exchange.U "Permalink to this definition")

Members Exchange

Type:

str

L[#](#alpaca.data.enums.Exchange.L "Permalink to this definition")

Long Term Stock Exchange

Type:

str

W[#](#alpaca.data.enums.Exchange.W "Permalink to this definition")

CBOE

Type:

str

X[#](#alpaca.data.enums.Exchange.X "Permalink to this definition")

NASDAQ OMX PSX

Type:

str

B[#](#alpaca.data.enums.Exchange.B "Permalink to this definition")

NASDAQ OMX BX

Type:

str

D[#](#alpaca.data.enums.Exchange.D "Permalink to this definition")

FINRA ADF

Type:

str

J[#](#alpaca.data.enums.Exchange.J "Permalink to this definition")

Cboe EDGA

Type:

str

P[#](#alpaca.data.enums.Exchange.P "Permalink to this definition")

NYSE Arca

Type:

str

Q[#](#alpaca.data.enums.Exchange.Q "Permalink to this definition")

NASDAQ OMX

Type:

str

S[#](#alpaca.data.enums.Exchange.S "Permalink to this definition")

NASDAQ Small Cap

Type:

str

V[#](#alpaca.data.enums.Exchange.V "Permalink to this definition")

IEX

Type:

str

A[#](#alpaca.data.enums.Exchange.A "Permalink to this definition")

NYSE American (AMEX)

Type:

str

E[#](#alpaca.data.enums.Exchange.E "Permalink to this definition")

Market Independent

Type:

str

N[#](#alpaca.data.enums.Exchange.N "Permalink to this definition")

New York Stock Exchange

Type:

str

T[#](#alpaca.data.enums.Exchange.T "Permalink to this definition")

NASDAQ Int

Type:

str

Y[#](#alpaca.data.enums.Exchange.Y "Permalink to this definition")

Cboe BYX

Type:

str

C[#](#alpaca.data.enums.Exchange.C "Permalink to this definition")

National Stock Exchange

Type:

str

H[#](#alpaca.data.enums.Exchange.H "Permalink to this definition")

MIAX

Type:

str

K[#](#alpaca.data.enums.Exchange.K "Permalink to this definition")

Cboe EDGX

Type:

str

DataFeed[#](#datafeed "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.data.enums.DataFeed(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.DataFeed "Permalink to this definition")

Equity market data feeds. OTC and SIP are available with premium data subscriptions.

IEX[#](#alpaca.data.enums.DataFeed.IEX "Permalink to this definition")

Investor’s exchange data feed

Type:

str

SIP[#](#alpaca.data.enums.DataFeed.SIP "Permalink to this definition")

Securities Information Processor feed

Type:

str

OTC[#](#alpaca.data.enums.DataFeed.OTC "Permalink to this definition")

Over the counter feed

Type:

str

Adjustment[#](#adjustment "Permalink to this heading")
------------------------------------------------------

_class_ alpaca.data.enums.Adjustment(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.Adjustment "Permalink to this definition")

Data normalization based on types of corporate actions.

RAW[#](#alpaca.data.enums.Adjustment.RAW "Permalink to this definition")

Unadjusted data

Type:

str

SPLIT[#](#alpaca.data.enums.Adjustment.SPLIT "Permalink to this definition")

Stock-split adjusted data

Type:

str

DIVIDEND[#](#alpaca.data.enums.Adjustment.DIVIDEND "Permalink to this definition")

Dividend adjusted data

Type:

str

ALL[#](#alpaca.data.enums.Adjustment.ALL "Permalink to this definition")

Data adjusted for all corporate actions

Type:

str

CryptoFeed[#](#cryptofeed "Permalink to this heading")
------------------------------------------------------

_class_ alpaca.data.enums.CryptoFeed(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.CryptoFeed "Permalink to this definition")

Crypto location

US[#](#alpaca.data.enums.CryptoFeed.US "Permalink to this definition")

United States crypto feed

Type:

str

MostActivesBy[#](#mostactivesby "Permalink to this heading")
------------------------------------------------------------

_class_ alpaca.data.enums.MostActivesBy(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.MostActivesBy "Permalink to this definition")

Most actives possible filters.

volume[#](#alpaca.data.enums.MostActivesBy.volume "Permalink to this definition")

Retrieve most actives by trading volume.

Type:

str

trades[#](#alpaca.data.enums.MostActivesBy.trades "Permalink to this definition")

Retrieve most actives by number of trades.

Type:

str

MarketType[#](#markettype "Permalink to this heading")
------------------------------------------------------

_class_ alpaca.data.enums.MarketType(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.MarketType "Permalink to this definition")

Most actives possible filters.

stocks[#](#alpaca.data.enums.MarketType.stocks "Permalink to this definition")

Type:

str

crypto[#](#alpaca.data.enums.MarketType.crypto "Permalink to this definition")

Type:

str

CorporateActionsType[#](#corporateactionstype "Permalink to this heading")
--------------------------------------------------------------------------

_class_ alpaca.data.enums.CorporateActionsType(_value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[#](#alpaca.data.enums.CorporateActionsType "Permalink to this definition")

The type of corporate action. ref. [https://docs.alpaca.markets/reference/corporateactions-1](https://docs.alpaca.markets/reference/corporateactions-1)

REVERSE\_SPLIT[#](#alpaca.data.enums.CorporateActionsType.REVERSE_SPLIT "Permalink to this definition")

Reverse split

Type:

str

FORWARD\_SPLIT[#](#alpaca.data.enums.CorporateActionsType.FORWARD_SPLIT "Permalink to this definition")

Forward split

Type:

str

UNIT\_SPLIT[#](#alpaca.data.enums.CorporateActionsType.UNIT_SPLIT "Permalink to this definition")

Unit split

Type:

str

CASH\_DIVIDEND[#](#alpaca.data.enums.CorporateActionsType.CASH_DIVIDEND "Permalink to this definition")

Cash dividend

Type:

str

STOCK\_DIVIDEND[#](#alpaca.data.enums.CorporateActionsType.STOCK_DIVIDEND "Permalink to this definition")

Stock dividend

Type:

str

SPIN\_OFF[#](#alpaca.data.enums.CorporateActionsType.SPIN_OFF "Permalink to this definition")

Spin off

Type:

str

CASH\_MERGER[#](#alpaca.data.enums.CorporateActionsType.CASH_MERGER "Permalink to this definition")

Cash merger

Type:

str

STOCK\_MERGER[#](#alpaca.data.enums.CorporateActionsType.STOCK_MERGER "Permalink to this definition")

Stock merger

Type:

str

STOCK\_AND\_CASH\_MERGER[#](#alpaca.data.enums.CorporateActionsType.STOCK_AND_CASH_MERGER "Permalink to this definition")

Stock and cash merger

Type:

str

REDEMPTION[#](#alpaca.data.enums.CorporateActionsType.REDEMPTION "Permalink to this definition")

Redemption

Type:

str

NAME\_CHANGE[#](#alpaca.data.enums.CorporateActionsType.NAME_CHANGE "Permalink to this definition")

Name change

Type:

str

WORTHLESS\_REMOVAL[#](#alpaca.data.enums.CorporateActionsType.WORTHLESS_REMOVAL "Permalink to this definition")

Worthless removal

Type:

str

RIGHTS\_DISTRIBUTION[#](#alpaca.data.enums.CorporateActionsType.RIGHTS_DISTRIBUTION "Permalink to this definition")

Rights distribution

Type:

str</content>
</page>

<page>
  <title>TradingClient - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/trading-client.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

_class_ alpaca.trading.client.TradingClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _paper: bool \= True_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.trading.client.TradingClient "Permalink to this definition")

A client to interact with the trading API, in both paper and live mode.

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _oauth\_token: Optional\[str\] \= None_, _paper: bool \= True_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_) → None[#](#alpaca.trading.client.TradingClient.__init__ "Permalink to this definition")

Instantiates a client for trading and managing personal brokerage accounts.

Parameters:

*   **api\_key** (_Optional__\[__str__\]_) – The API key for trading. Use paper keys if paper is set to true.
    
*   **secret\_key** (_Optional__\[__str__\]_) – The secret key for trading. Use paper keys if paper is set to true.
    
*   **oauth\_token** (_Optional__\[__str__\]_) – The oauth token for trading on behalf of end user.
    
*   **paper** (_bool_) – True is paper trading should be enabled.
    
*   **raw\_data** (_bool_) – Whether API responses should be wrapped in data models or returned raw. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]_) – If specified allows you to override the base url the client points to for proxy/testing.</content>
</page>

<page>
  <title>TradingStream - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/stream.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

_class_ alpaca.trading.stream.TradingStream(_api\_key: str_, _secret\_key: str_, _paper: bool \= True_, _raw\_data: bool \= False_, _url\_override: str \= None_, _websocket\_params: Optional\[Dict\] \= None_)[#](#alpaca.trading.stream.TradingStream "Permalink to this definition")

This is a WebSocket client which allows you to streaming data from your trading account.

Learn more here: [https://alpaca.markets/docs/api-references/trading-api/streaming/](https://alpaca.markets/docs/api-references/trading-api/streaming/)

If using paper keys, make sure to set `paper` to True when instantiating the client.

_async_ close() → None[#](#alpaca.trading.stream.TradingStream.close "Permalink to this definition")

Closes the websocket connection.

run() → None[#](#alpaca.trading.stream.TradingStream.run "Permalink to this definition")

Starts up the websocket connection’s event loop

stop() → None[#](#alpaca.trading.stream.TradingStream.stop "Permalink to this definition")

Stops the websocket connection.

_async_ stop\_ws() → None[#](#alpaca.trading.stream.TradingStream.stop_ws "Permalink to this definition")

Signals websocket connection should close by adding a closing message to the stop\_stream\_queue

subscribe\_trade\_updates(_handler: Callable_)[#](#alpaca.trading.stream.TradingStream.subscribe_trade_updates "Permalink to this definition")

Subscribes to trade updates for your trading account.

Parameters:

**handler** (_Callable_) – The async handler that will receive trade update data.

Returns:

None</content>
</page>

<page>
  <title>Account - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/account.html</url>
  <content>Toggle site navigation sidebar

[

Alpaca-py

](https://alpaca.markets/sdks/python/index.html)

Toggle table of contents sidebar

[Back to top](#)

Toggle table of contents sidebar

The account endpoint allow you to retrieve information about your account.

Get Account Details[#](#get-account-details "Permalink to this heading")
------------------------------------------------------------------------

TradingClient.get\_account() → Union\[[TradeAccount](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.TradeAccount "alpaca.trading.models.TradeAccount"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_account "Permalink to this definition")

Returns account details. Contains information like buying power, number of day trades, and account status.

Returns:

The account details

Return type:

[alpaca.trading.models.TradeAccount](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.TradeAccount "alpaca.trading.models.TradeAccount")</content>
</page>

<page>
  <title>Positions - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/positions.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The position endpoints allow you to view and manage your open positions.

Get All Positions[#](#get-all-positions "Permalink to this heading")
--------------------------------------------------------------------

TradingClient.get\_all\_positions() → Union\[List\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_all_positions "Permalink to this definition")

Gets all the current open positions.

Returns:

List of open positions.

Return type:

List\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")\]

Get Open Position[#](#get-open-position "Permalink to this heading")
--------------------------------------------------------------------

TradingClient.get\_open\_position(_symbol\_or\_asset\_id: Union\[UUID, str\]_) → Union\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_open_position "Permalink to this definition")

Gets the open position for an account for a single asset. Throws an APIError if the position does not exist.

Parameters:

**symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol name of asset id of the position to get.

Returns:

Open position of the asset.

Return type:

[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")

Close All Positions[#](#close-all-positions "Permalink to this heading")
------------------------------------------------------------------------

TradingClient.close\_all\_positions(_cancel\_orders: Optional\[bool\] \= None_) → Union\[List\[[ClosePositionResponse](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.ClosePositionResponse "alpaca.trading.models.ClosePositionResponse")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.close_all_positions "Permalink to this definition")

Liquidates all positions for an account.

Places an order for each open position to liquidate.

Parameters:

**cancel\_orders** (_Optional__\[__bool__\]_) – If true is specified, cancel all open orders before liquidating all positions.

Returns:

A list of responses from each closed position containing the status code and

order id.

Return type:

List\[[ClosePositionResponse](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.ClosePositionResponse "alpaca.trading.models.ClosePositionResponse")\]

Close A Position[#](#close-a-position "Permalink to this heading")
------------------------------------------------------------------

TradingClient.close\_position(_symbol\_or\_asset\_id: Union\[UUID, str\]_, _close\_options: Optional\[[ClosePositionRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ClosePositionRequest "alpaca.trading.requests.ClosePositionRequest")\] \= None_) → Union\[[Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.close_position "Permalink to this definition")

Liquidates the position for a single asset.

Places a single order to close the position for the asset.

**This method will throw an error if the position does not exist!**

Parameters:

*   **symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol name of asset id of the position to close.
    
*   **close\_options** – The various close position request parameters.
    

Returns:

The order that was placed to close the position.

Return type:

[alpaca.trading.models.Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")

Exercise An Option Contract[#](#exercise-an-option-contract "Permalink to this heading")
----------------------------------------------------------------------------------------

TradingClient.exercise\_options\_position(_symbol\_or\_contract\_id: Union\[UUID, str\]_) → None[#](#alpaca.trading.client.TradingClient.exercise_options_position "Permalink to this definition")

This endpoint enables users to exercise a held option contract, converting it into the underlying asset based on the specified terms. All available held shares of this option contract will be exercised. By default, Alpaca will automatically exercise in-the-money (ITM) contracts at expiry. Exercise requests will be processed immediately once received. Exercise requests submitted outside market hours will be rejected. To cancel an exercise request or to submit a Do-not-exercise (DNE) instruction, please contact our support team.

Parameters:

**symbol\_or\_contract\_id** (_Union__\[__UUID__,_ _str__\]_) – Option contract symbol or ID.

Returns:

None</content>
</page>

<page>
  <title>Orders - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/orders.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The order endpoints allow you to create and manage orders made on your brokerage account.

Create a New Order[#](#create-a-new-order "Permalink to this heading")
----------------------------------------------------------------------

TradingClient.submit\_order(_order\_data: [OrderRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.OrderRequest "alpaca.trading.requests.OrderRequest")_) → Union\[[Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.submit_order "Permalink to this definition")

Creates an order to buy or sell an asset.

Parameters:

**order\_data** ([_alpaca.trading.requests.OrderRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.OrderRequest "alpaca.trading.requests.OrderRequest")) – The request data for creating a new order.

Returns:

The resulting submitted order.

Return type:

[alpaca.trading.models.Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")

Get Orders[#](#get-orders "Permalink to this heading")
------------------------------------------------------

TradingClient.get\_orders(_filter: Optional\[[GetOrdersRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrdersRequest "alpaca.trading.requests.GetOrdersRequest")\] \= None_) → Union\[List\[[Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_orders "Permalink to this definition")

Returns all orders. Orders can be filtered by parameters.

Parameters:

**filter** (_Optional__\[_[_GetOrdersRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrdersRequest "alpaca.trading.requests.GetOrdersRequest")_\]_) – The parameters to filter the orders with.

Returns:

The queried orders.

Return type:

List\[[alpaca.trading.models.Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")\]

Get Order By Id[#](#get-order-by-id "Permalink to this heading")
----------------------------------------------------------------

TradingClient.get\_order\_by\_id(_order\_id: Union\[UUID, str\]_, _filter: Optional\[[GetOrderByIdRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrderByIdRequest "alpaca.trading.requests.GetOrderByIdRequest")\] \= None_) → Union\[[Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_order_by_id "Permalink to this definition")

Returns a specific order by its order id.

Parameters:

*   **order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier for the order.
    
*   **filter** (_Optional__\[_[_GetOrderByIdRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrderByIdRequest "alpaca.trading.requests.GetOrderByIdRequest")_\]_) – The parameters for the query.
    

Returns:

The order that was queried.

Return type:

[alpaca.trading.models.Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")

Replace Order By Id[#](#replace-order-by-id "Permalink to this heading")
------------------------------------------------------------------------

TradingClient.replace\_order\_by\_id(_order\_id: Union\[UUID, str\]_, _order\_data: Optional\[[ReplaceOrderRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ReplaceOrderRequest "alpaca.trading.requests.ReplaceOrderRequest")\] \= None_) → Union\[[Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.replace_order_by_id "Permalink to this definition")

Updates an order with new parameters.

Parameters:

*   **order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier for the order being replaced.
    
*   **order\_data** (_Optional__\[_[_ReplaceOrderRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ReplaceOrderRequest "alpaca.trading.requests.ReplaceOrderRequest")_\]_) – The parameters we wish to update.
    

Returns:

The updated order.

Return type:

[alpaca.trading.models.Order](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Order "alpaca.trading.models.Order")

Cancel All Orders[#](#cancel-all-orders "Permalink to this heading")
--------------------------------------------------------------------

TradingClient.cancel\_orders() → Union\[List\[[CancelOrderResponse](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CancelOrderResponse "alpaca.trading.requests.CancelOrderResponse")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.cancel_orders "Permalink to this definition")

Cancels all orders.

Returns:

The list of HTTP statuses for each order attempted to be cancelled.

Return type:

List\[[CancelOrderResponse](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CancelOrderResponse "alpaca.trading.requests.CancelOrderResponse")\]

Cancel Order By Id[#](#cancel-order-by-id "Permalink to this heading")
----------------------------------------------------------------------

TradingClient.cancel\_order\_by\_id(_order\_id: Union\[UUID, str\]_) → None[#](#alpaca.trading.client.TradingClient.cancel_order_by_id "Permalink to this definition")

Cancels a specific order by its order id.

Parameters:

**order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier of the order being cancelled.

Returns:

The HTTP response from the cancel request.

Return type:

[CancelOrderResponse](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CancelOrderResponse "alpaca.trading.requests.CancelOrderResponse")</content>
</page>

<page>
  <title>Assets - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/assets.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The assets endpoints allow you to view the list of assets available on Alpaca for market data and trading. Keep in mind, some assets are only available for market data and trading them is not yet possible.

Get All Assets[#](#get-all-assets "Permalink to this heading")
--------------------------------------------------------------

TradingClient.get\_all\_assets(_filter: Optional\[[GetAssetsRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetAssetsRequest "alpaca.trading.requests.GetAssetsRequest")\] \= None_) → Union\[List\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_all_assets "Permalink to this definition")

The assets API serves as the master list of assets available for trade and data consumption from Alpaca. Some assets are not tradable with Alpaca. These assets will be marked with the flag tradable=false.

Parameters:

**filter** (_Optional__\[_[_GetAssetsRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetAssetsRequest "alpaca.trading.requests.GetAssetsRequest")_\]_) – The parameters that can be assets can be queried by.

Returns:

The list of assets.

Return type:

List\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\]

Get Asset[#](#get-asset "Permalink to this heading")
----------------------------------------------------

TradingClient.get\_asset(_symbol\_or\_asset\_id: Union\[UUID, str\]_) → Union\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_asset "Permalink to this definition")

Returns a specific asset by its symbol or asset id. If the specified asset does not exist a 404 error will be thrown.

Parameters:

**symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol or asset id for the specified asset

Returns:

The asset if it exists.

Return type:

[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")</content>
</page>

<page>
  <title>Contracts - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/contracts.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The option contracts endpoints allow you to view the list of option contracts available on Alpaca for market data and trading.

Get Option Contracts[#](#get-option-contracts "Permalink to this heading")
--------------------------------------------------------------------------

TradingClient.get\_option\_contracts(_request: GetOptionContractsRequest_) → Union\[OptionContractsResponse, Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_option_contracts "Permalink to this definition")

The option contracts API serves as the master list of option contracts available for trade and data consumption from Alpaca.

Parameters:

**request** (_GetOptionContractsRequest_) – The parameters that option contracts can be queried by.

Returns:

The object includes list of option contracts.

Return type:

OptionContracts (Union\[OptionContractsResponse, RawData\])

Get Option Contract[#](#get-option-contract "Permalink to this heading")
------------------------------------------------------------------------

TradingClient.get\_option\_contract(_symbol\_or\_id: Union\[UUID, str\]_) → Union\[OptionContract, Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_option_contract "Permalink to this definition")

The option contracts API serves as the master list of option contracts available for trade and data consumption from Alpaca.

Parameters:

**symbol\_or\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol or id of the option contract to retrieve.

Returns:

The list of option contracts.

Return type:

OptionContracts (Union\[OptionContracts, RawData\])</content>
</page>

<page>
  <title>Watchlists - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/watchlists.html</url>
  <content>Toggle table of contents sidebar

The watchlist endpoints allow you to create lists of securities and track their performance.

Create a New Watchlist[#](#create-a-new-watchlist "Permalink to this heading")
------------------------------------------------------------------------------

TradingClient.create\_watchlist(_watchlist\_data: [CreateWatchlistRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CreateWatchlistRequest "alpaca.trading.requests.CreateWatchlistRequest")_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.create_watchlist "Permalink to this definition")

Creates a new watchlist.

Parameters:

**watchlist\_data** ([_CreateWatchlistRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CreateWatchlistRequest "alpaca.trading.requests.CreateWatchlistRequest")) – The watchlist to create.

Returns:

The new watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Get All Watchlists[#](#get-all-watchlists "Permalink to this heading")
----------------------------------------------------------------------

TradingClient.get\_watchlists() → Union\[List\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_watchlists "Permalink to this definition")

Returns all watchlists.

Returns:

The list of all watchlists.

Return type:

List\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")\]

Get a Watchlist By Id[#](#get-a-watchlist-by-id "Permalink to this heading")
----------------------------------------------------------------------------

TradingClient.get\_watchlist\_by\_id(_watchlist\_id: Union\[UUID, str\]_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_watchlist_by_id "Permalink to this definition")

Returns a specific watchlist by its id.

Parameters:

**watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to retrieve.

Returns:

The watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Update Watchlist By Id[#](#update-watchlist-by-id "Permalink to this heading")
------------------------------------------------------------------------------

TradingClient.update\_watchlist\_by\_id(_watchlist\_id: Union\[UUID, str\]_, _watchlist\_data: [UpdateWatchlistRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.UpdateWatchlistRequest "alpaca.trading.requests.UpdateWatchlistRequest")_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.update_watchlist_by_id "Permalink to this definition")

Updates a watchlist with new data.

Parameters:

*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to be updated.
    
*   **watchlist\_data** ([_UpdateWatchlistRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.UpdateWatchlistRequest "alpaca.trading.requests.UpdateWatchlistRequest")) – The new watchlist data.
    

Returns:

The watchlist with updated data.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Add Asset To Watchlist By Id[#](#add-asset-to-watchlist-by-id "Permalink to this heading")
------------------------------------------------------------------------------------------

TradingClient.add\_asset\_to\_watchlist\_by\_id(_watchlist\_id: Union\[UUID, str\]_, _symbol: str_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.add_asset_to_watchlist_by_id "Permalink to this definition")

Adds an asset by its symbol to a specified watchlist.

Parameters:

*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to add the symbol to.
    
*   **symbol** (_str_) – The symbol for the asset to add.
    

Returns:

The updated watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Remove Asset From Watchlist By Id[#](#remove-asset-from-watchlist-by-id "Permalink to this heading")
----------------------------------------------------------------------------------------------------

TradingClient.remove\_asset\_from\_watchlist\_by\_id(_watchlist\_id: Union\[UUID, str\]_, _symbol: str_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.remove_asset_from_watchlist_by_id "Permalink to this definition")

Removes an asset from a watchlist.

Parameters:

*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to remove the asset from.
    
*   **symbol** (_str_) – The symbol for the asset to add.
    

Returns:

The updated watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Delete Watchlist By Id[#](#delete-watchlist-by-id "Permalink to this heading")
------------------------------------------------------------------------------

TradingClient.delete\_watchlist\_by\_id(_watchlist\_id: Union\[UUID, str\]_) → None[#](#alpaca.trading.client.TradingClient.delete_watchlist_by_id "Permalink to this definition")

Deletes a watchlist. This is permanent.

Parameters:

**watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to delete.

Returns:

None</content>
</page>

<page>
  <title>Clock - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/clock.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The clock endpoint allows you to view the market clock. The market clock contains a record of the trading hours for a given day.

Get Clock[#](#get-clock "Permalink to this heading")
----------------------------------------------------

TradingClient.get\_clock() → Union\[[Clock](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Clock "alpaca.trading.models.Clock"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_clock "Permalink to this definition")

Gets the current market timestamp, whether or not the market is currently open, as well as the times of the next market open and close.

Returns:

The market Clock data

Return type:

[Clock](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Clock "alpaca.trading.models.Clock")</content>
</page>

<page>
  <title>Corporate Actions - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/corporate-actions.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The corporate actions endpoints allow you to retrieve data for splits, mergers, and other corporate events.

Get Corporate Actions[#](#get-corporate-actions "Permalink to this heading")
----------------------------------------------------------------------------

TradingClient.get\_corporate\_announcements(_filter: [GetCorporateAnnouncementsRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetCorporateAnnouncementsRequest "alpaca.trading.requests.GetCorporateAnnouncementsRequest")_) → Union\[List\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_corporate_announcements "Permalink to this definition")

Returns corporate action announcements data given specified search criteria. :param filter: The parameters to filter the search by. :type filter: GetCorporateAnnouncementsRequest

Returns:

The resulting announcements from the search.

Return type:

List\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")\]

Get Corporate Action By ID[#](#get-corporate-action-by-id "Permalink to this heading")
--------------------------------------------------------------------------------------

TradingClient.get\_corporate\_announcement\_by\_id(_corporate\_announcment\_id: Union\[UUID, str\]_) → Union\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement"), Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_corporate_announcement_by_id "Permalink to this definition")

Returns a specific corporate action announcement. :param corporate\_announcment\_id: The id of the desired corporate action announcement

Returns:

The corporate action queried.

Return type:

[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")</content>
</page>

<page>
  <title>Calendar - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/calendar.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The calendar endpoint allows you to view the market calendar. The market calendar contains a record of all trading days.

Get Calendar[#](#get-calendar "Permalink to this heading")
----------------------------------------------------------

TradingClient.get\_calendar(_filters: Optional\[[GetCalendarRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetCalendarRequest "alpaca.trading.requests.GetCalendarRequest")\] \= None_) → Union\[List\[[Calendar](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Calendar "alpaca.trading.models.Calendar")\], Dict\[str, Any\]\][#](#alpaca.trading.client.TradingClient.get_calendar "Permalink to this definition")

The calendar API serves the full list of market days from 1970 to 2029. It can also be queried by specifying a start and/or end time to narrow down the results.

In addition to the dates, the response also contains the specific open and close times for the market days, taking into account early closures.

Parameters:

**filters** – Any optional filters to limit the returned market days

Returns:

A list of Calendar objects representing the market days.

Return type:

List\[[Calendar](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Calendar "alpaca.trading.models.Calendar")\]</content>
</page>

<page>
  <title>Models - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/models.html</url>
  <content>Asset[#](#asset "Permalink to this heading")
--------------------------------------------

_class_ alpaca.trading.models.Asset(_\*_, _id: UUID_, _asset\_class: [AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")_, _exchange: [AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")_, _symbol: str_, _name: Optional\[str\] \= None_, _status: [AssetStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetStatus "alpaca.trading.enums.AssetStatus")_, _tradable: bool_, _marginable: bool_, _shortable: bool_, _easy\_to\_borrow: bool_, _fractionable: bool_, _min\_order\_size: Optional\[float\] \= None_, _min\_trade\_increment: Optional\[float\] \= None_, _price\_increment: Optional\[float\] \= None_, _maintenance\_margin\_requirement: Optional\[float\] \= None_, _attributes: Optional\[List\[str\]\] \= None_)[#](#alpaca.trading.models.Asset "Permalink to this definition")

Represents a security. Some Assets are not tradable with Alpaca. These Assets are marked with the flag tradable=false.

For more info, visit [https://alpaca.markets/docs/api-references/trading-api/assets/](https://alpaca.markets/docs/api-references/trading-api/assets/)

id[#](#alpaca.trading.models.Asset.id "Permalink to this definition")

Unique id of asset

Type:

UUID

asset\_class[#](#alpaca.trading.models.Asset.asset_class "Permalink to this definition")

The name of the asset class.

Type:

[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")

exchange[#](#alpaca.trading.models.Asset.exchange "Permalink to this definition")

Which exchange this asset is available through.

Type:

[AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")

symbol[#](#alpaca.trading.models.Asset.symbol "Permalink to this definition")

The symbol identifier of the asset.

Type:

str

name[#](#alpaca.trading.models.Asset.name "Permalink to this definition")

The name of the asset.

Type:

Optional\[str\]

status[#](#alpaca.trading.models.Asset.status "Permalink to this definition")

The active status of the asset.

Type:

[AssetStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetStatus "alpaca.trading.enums.AssetStatus")

tradable[#](#alpaca.trading.models.Asset.tradable "Permalink to this definition")

Whether the asset can be traded.

Type:

bool

marginable[#](#alpaca.trading.models.Asset.marginable "Permalink to this definition")

Whether the asset can be traded on margin.

Type:

bool

shortable[#](#alpaca.trading.models.Asset.shortable "Permalink to this definition")

Whether the asset can be shorted.

Type:

bool

easy\_to\_borrow[#](#alpaca.trading.models.Asset.easy_to_borrow "Permalink to this definition")

When shorting, whether the asset is easy to borrow

Type:

bool

fractionable[#](#alpaca.trading.models.Asset.fractionable "Permalink to this definition")

Whether fractional shares are available

Type:

bool

attributes[#](#alpaca.trading.models.Asset.attributes "Permalink to this definition")

One of ptp\_no\_exception or ptp\_with\_exception. It will include unique characteristics of the asset here.

Type:

Optional\[List\[str\]\]

Position[#](#position "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.trading.models.Position(_\*_, _asset\_id: UUID_, _symbol: str_, _exchange: [AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")_, _asset\_class: [AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")_, _asset\_marginable: Optional\[bool\] \= None_, _avg\_entry\_price: str_, _qty: str_, _side: [PositionSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionSide "alpaca.trading.enums.PositionSide")_, _market\_value: Optional\[str\] \= None_, _cost\_basis: str_, _unrealized\_pl: Optional\[str\] \= None_, _unrealized\_plpc: Optional\[str\] \= None_, _unrealized\_intraday\_pl: Optional\[str\] \= None_, _unrealized\_intraday\_plpc: Optional\[str\] \= None_, _current\_price: Optional\[str\] \= None_, _lastday\_price: Optional\[str\] \= None_, _change\_today: Optional\[str\] \= None_, _swap\_rate: Optional\[str\] \= None_, _avg\_entry\_swap\_rate: Optional\[str\] \= None_, _usd: Optional\[USDPositionValues\] \= None_, _qty\_available: Optional\[str\] \= None_)[#](#alpaca.trading.models.Position "Permalink to this definition")

Represents an open long or short holding in an asset.

asset\_id[#](#alpaca.trading.models.Position.asset_id "Permalink to this definition")

ID of the asset.

Type:

UUID

symbol[#](#alpaca.trading.models.Position.symbol "Permalink to this definition")

Symbol of the asset.

Type:

str

exchange[#](#alpaca.trading.models.Position.exchange "Permalink to this definition")

Exchange name of the asset.

Type:

[AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")

asset\_class[#](#alpaca.trading.models.Position.asset_class "Permalink to this definition")

Name of the asset’s asset class.

Type:

[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")

asset\_marginable[#](#alpaca.trading.models.Position.asset_marginable "Permalink to this definition")

Indicates if this asset is marginable.

Type:

Optional\[bool\]

avg\_entry\_price[#](#alpaca.trading.models.Position.avg_entry_price "Permalink to this definition")

The average entry price of the position.

Type:

str

qty[#](#alpaca.trading.models.Position.qty "Permalink to this definition")

The number of shares of the position.

Type:

str

side[#](#alpaca.trading.models.Position.side "Permalink to this definition")

“long” or “short” representing the side of the position.

Type:

[PositionSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionSide "alpaca.trading.enums.PositionSide")

market\_value[#](#alpaca.trading.models.Position.market_value "Permalink to this definition")

Total dollar amount of the position.

Type:

Optional\[str\]

cost\_basis[#](#alpaca.trading.models.Position.cost_basis "Permalink to this definition")

Total cost basis in dollars.

Type:

str

unrealized\_pl[#](#alpaca.trading.models.Position.unrealized_pl "Permalink to this definition")

Unrealized profit/loss in dollars.

Type:

Optional\[str\]

unrealized\_plpc[#](#alpaca.trading.models.Position.unrealized_plpc "Permalink to this definition")

Unrealized profit/loss percent.

Type:

Optional\[str\]

unrealized\_intraday\_pl[#](#alpaca.trading.models.Position.unrealized_intraday_pl "Permalink to this definition")

Unrealized profit/loss in dollars for the day.

Type:

Optional\[str\]

unrealized\_intraday\_plpc[#](#alpaca.trading.models.Position.unrealized_intraday_plpc "Permalink to this definition")

Unrealized profit/loss percent for the day.

Type:

Optional\[str\]

current\_price[#](#alpaca.trading.models.Position.current_price "Permalink to this definition")

Current asset price per share.

Type:

Optional\[str\]

lastday\_price[#](#alpaca.trading.models.Position.lastday_price "Permalink to this definition")

Last day’s asset price per share based on the closing value of the last trading day.

Type:

Optional\[str\]

change\_today[#](#alpaca.trading.models.Position.change_today "Permalink to this definition")

Percent change from last day’s price.

Type:

Optional\[str\]

swap\_rate[#](#alpaca.trading.models.Position.swap_rate "Permalink to this definition")

Swap rate is the exchange rate (without mark-up) used to convert the price into local currency or crypto asset.

Type:

Optional\[str\]

avg\_entry\_swap\_rate[#](#alpaca.trading.models.Position.avg_entry_swap_rate "Permalink to this definition")

The average exchange rate the price was converted into the local currency at.

Type:

Optional\[str\]

usd[#](#alpaca.trading.models.Position.usd "Permalink to this definition")

Represents the position in USD values.

Type:

USDPositionValues

qty\_available[#](#alpaca.trading.models.Position.qty_available "Permalink to this definition")

Total number of shares available minus open orders.

Type:

Optional\[str\]

Order[#](#order "Permalink to this heading")
--------------------------------------------

_class_ alpaca.trading.models.Order(_\*_, _id: UUID_, _client\_order\_id: str_, _created\_at: datetime_, _updated\_at: datetime_, _submitted\_at: datetime_, _filled\_at: Optional\[datetime\] \= None_, _expired\_at: Optional\[datetime\] \= None_, _expires\_at: Optional\[datetime\] \= None_, _canceled\_at: Optional\[datetime\] \= None_, _failed\_at: Optional\[datetime\] \= None_, _replaced\_at: Optional\[datetime\] \= None_, _replaced\_by: Optional\[UUID\] \= None_, _replaces: Optional\[UUID\] \= None_, _asset\_id: Optional\[UUID\] \= None_, _symbol: Optional\[str\] \= None_, _asset\_class: Optional\[[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")\] \= None_, _notional: Optional\[str\] \= None_, _qty: Optional\[Union\[str, float\]\] \= None_, _filled\_qty: Optional\[Union\[str, float\]\] \= None_, _filled\_avg\_price: Optional\[Union\[str, float\]\] \= None_, _order\_class: [OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")_, _order\_type: Optional\[[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")\] \= None_, _type: Optional\[[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _limit\_price: Optional\[Union\[str, float\]\] \= None_, _stop\_price: Optional\[Union\[str, float\]\] \= None_, _status: [OrderStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderStatus "alpaca.trading.enums.OrderStatus")_, _extended\_hours: bool_, _legs: Optional\[List\[[Order](#alpaca.trading.models.Order "alpaca.trading.models.Order")\]\] \= None_, _trail\_percent: Optional\[str\] \= None_, _trail\_price: Optional\[str\] \= None_, _hwm: Optional\[str\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_, _ratio\_qty: Optional\[Union\[str, float\]\] \= None_)[#](#alpaca.trading.models.Order "Permalink to this definition")

Represents a request for the sale or purchase of an asset.

id[#](#alpaca.trading.models.Order.id "Permalink to this definition")

order ID generated by Alpaca.

Type:

UUID

client\_order\_id[#](#alpaca.trading.models.Order.client_order_id "Permalink to this definition")

Client unique order ID

Type:

str

created\_at[#](#alpaca.trading.models.Order.created_at "Permalink to this definition")

Timestamp when the order was created.

Type:

datetime

updated\_at[#](#alpaca.trading.models.Order.updated_at "Permalink to this definition")

Timestamp when the order was last updated.

Type:

datetime

submitted\_at[#](#alpaca.trading.models.Order.submitted_at "Permalink to this definition")

Timestamp when the order was submitted.

Type:

datetime

filled\_at[#](#alpaca.trading.models.Order.filled_at "Permalink to this definition")

Timestamp when the order was filled.

Type:

Optional\[datetime\]

expired\_at[#](#alpaca.trading.models.Order.expired_at "Permalink to this definition")

Timestamp when the order expired at.

Type:

Optional\[datetime\]

expires\_at[#](#alpaca.trading.models.Order.expires_at "Permalink to this definition")

An auto cancel request will be triggered after this timestamp.

Type:

Optional\[datetime\]

canceled\_at[#](#alpaca.trading.models.Order.canceled_at "Permalink to this definition")

Timestamp when the order was canceled.

Type:

Optional\[datetime\]

failed\_at[#](#alpaca.trading.models.Order.failed_at "Permalink to this definition")

Timestamp when the order failed at.

Type:

Optional\[datetime\]

replaced\_at[#](#alpaca.trading.models.Order.replaced_at "Permalink to this definition")

Timestamp when the order was replaced by a new order.

Type:

Optional\[datetime\]

replaced\_by[#](#alpaca.trading.models.Order.replaced_by "Permalink to this definition")

ID of order that replaces this order.

Type:

Optional\[UUID\]

replaces[#](#alpaca.trading.models.Order.replaces "Permalink to this definition")

ID of order which this order replaces.

Type:

Optional\[UUID\]

asset\_id[#](#alpaca.trading.models.Order.asset_id "Permalink to this definition")

ID of the asset. Omitted from top-level of response if the order is of mleg class.

Type:

Optional\[UUID\]

symbol[#](#alpaca.trading.models.Order.symbol "Permalink to this definition")

Symbol of the asset. Omitted from top-level of response if the order is of mleg class.

Type:

Optional\[str\]

asset\_class[#](#alpaca.trading.models.Order.asset_class "Permalink to this definition")

Asset class of the asset. Omitted from top-level of response if the order is of mleg class.

Type:

Optional\[[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")\]

notional[#](#alpaca.trading.models.Order.notional "Permalink to this definition")

Ordered notional amount. If entered, qty will be null. Can take up to 9 decimal points.

Type:

Optional\[str\]

qty[#](#alpaca.trading.models.Order.qty "Permalink to this definition")

Ordered quantity. If entered, notional will be null. Can take up to 9 decimal points.

Type:

Optional\[str\]

filled\_qty[#](#alpaca.trading.models.Order.filled_qty "Permalink to this definition")

Filled quantity.

Type:

Optional\[str\]

filled\_avg\_price[#](#alpaca.trading.models.Order.filled_avg_price "Permalink to this definition")

Filled average price. Can be 0 until order is processed in case order is passed outside of market hours.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.models.Order.order_class "Permalink to this definition")

Valid values: simple, bracket, oco or oto.

Type:

[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")

order\_type[#](#alpaca.trading.models.Order.order_type "Permalink to this definition")

Deprecated with just type field below. Omitted from legs of mleg orders.

Type:

Optional\[[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")\]

type[#](#alpaca.trading.models.Order.type "Permalink to this definition")

Valid values: market, limit, stop, stop\_limit, trailing\_stop. Omitted from legs of mleg orders.

Type:

Optional\[[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")\]

side[#](#alpaca.trading.models.Order.side "Permalink to this definition")

Valid values: buy and sell. Omitted from top-level of response if the order is of mleg class.

Type:

Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\]

time\_in\_force[#](#alpaca.trading.models.Order.time_in_force "Permalink to this definition")

Length of time the order is in force.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

limit\_price[#](#alpaca.trading.models.Order.limit_price "Permalink to this definition")

Limit price of the order.

Type:

Optional\[str\]

stop\_price[#](#alpaca.trading.models.Order.stop_price "Permalink to this definition")

Stop price of the order.

Type:

Optional\[str\]

status[#](#alpaca.trading.models.Order.status "Permalink to this definition")

The status of the order.

Type:

[OrderStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderStatus "alpaca.trading.enums.OrderStatus")

extended\_hours[#](#alpaca.trading.models.Order.extended_hours "Permalink to this definition")

If true, eligible for execution outside regular trading hours.

Type:

bool

legs[#](#alpaca.trading.models.Order.legs "Permalink to this definition")

When querying non-simple order\_class orders in a nested style, an array of order entities associated with this order. Otherwise, null.

Type:

Optional\[List\[[alpaca.trading.models.Order](#alpaca.trading.models.Order "alpaca.trading.models.Order")\]\]

trail\_percent[#](#alpaca.trading.models.Order.trail_percent "Permalink to this definition")

The percent value away from the high water mark for trailing stop orders.

Type:

Optional\[str\]

trail\_price[#](#alpaca.trading.models.Order.trail_price "Permalink to this definition")

The dollar value away from the high water mark for trailing stop orders.

Type:

Optional\[str\]

hwm[#](#alpaca.trading.models.Order.hwm "Permalink to this definition")

The highest (lowest) market price seen since the trailing stop order was submitted.

Type:

Optional\[str\]

position\_intent[#](#alpaca.trading.models.Order.position_intent "Permalink to this definition")

Represents the desired position strategy.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

ratio\_qty[#](#alpaca.trading.models.Order.ratio_qty "Permalink to this definition")

The proportional quantity of this leg in relation to the overall multi-leg order quantity.

Type:

Optional\[str\]

TradeAccount[#](#tradeaccount "Permalink to this heading")
----------------------------------------------------------

_class_ alpaca.trading.models.TradeAccount(_\*_, _id: UUID_, _account\_number: str_, _status: [AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")_, _crypto\_status: Optional\[[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")\] \= None_, _currency: Optional\[str\] \= None_, _buying\_power: Optional\[str\] \= None_, _regt\_buying\_power: Optional\[str\] \= None_, _daytrading\_buying\_power: Optional\[str\] \= None_, _non\_marginable\_buying\_power: Optional\[str\] \= None_, _cash: Optional\[str\] \= None_, _accrued\_fees: Optional\[str\] \= None_, _pending\_transfer\_out: Optional\[str\] \= None_, _pending\_transfer\_in: Optional\[str\] \= None_, _portfolio\_value: Optional\[str\] \= None_, _pattern\_day\_trader: Optional\[bool\] \= None_, _trading\_blocked: Optional\[bool\] \= None_, _transfers\_blocked: Optional\[bool\] \= None_, _account\_blocked: Optional\[bool\] \= None_, _created\_at: Optional\[datetime\] \= None_, _trade\_suspended\_by\_user: Optional\[bool\] \= None_, _multiplier: Optional\[str\] \= None_, _shorting\_enabled: Optional\[bool\] \= None_, _equity: Optional\[str\] \= None_, _last\_equity: Optional\[str\] \= None_, _long\_market\_value: Optional\[str\] \= None_, _short\_market\_value: Optional\[str\] \= None_, _initial\_margin: Optional\[str\] \= None_, _maintenance\_margin: Optional\[str\] \= None_, _last\_maintenance\_margin: Optional\[str\] \= None_, _sma: Optional\[str\] \= None_, _daytrade\_count: Optional\[int\] \= None_, _options\_buying\_power: Optional\[str\] \= None_, _options\_approved\_level: Optional\[int\] \= None_, _options\_trading\_level: Optional\[int\] \= None_)[#](#alpaca.trading.models.TradeAccount "Permalink to this definition")

Represents trading account information for an Account.

id[#](#alpaca.trading.models.TradeAccount.id "Permalink to this definition")

The account ID

Type:

UUID

account\_number[#](#alpaca.trading.models.TradeAccount.account_number "Permalink to this definition")

The account number

Type:

str

status[#](#alpaca.trading.models.TradeAccount.status "Permalink to this definition")

The current status of the account

Type:

[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")

crypto\_status[#](#alpaca.trading.models.TradeAccount.crypto_status "Permalink to this definition")

The status of the account in regards to trading crypto. Only present if crypto trading is enabled for your brokerage account.

Type:

Optional\[[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")\]

currency[#](#alpaca.trading.models.TradeAccount.currency "Permalink to this definition")

Currently will always be the value “USD”.

Type:

Optional\[str\]

buying\_power[#](#alpaca.trading.models.TradeAccount.buying_power "Permalink to this definition")

Current available cash buying power. If multiplier = 2 then buying\_power = max(equity-initial\_margin(0) \* 2). If multiplier = 1 then buying\_power = cash.

Type:

Optional\[str\]

regt\_buying\_power[#](#alpaca.trading.models.TradeAccount.regt_buying_power "Permalink to this definition")

User’s buying power under Regulation T (excess equity - (equity - margin value) - \* margin multiplier)

Type:

Optional\[str\]

daytrading\_buying\_power[#](#alpaca.trading.models.TradeAccount.daytrading_buying_power "Permalink to this definition")

The buying power for day trades for the account

Type:

Optional\[str\]

non\_marginable\_buying\_power[#](#alpaca.trading.models.TradeAccount.non_marginable_buying_power "Permalink to this definition")

The non marginable buying power for the account

Type:

Optional\[str\]

cash[#](#alpaca.trading.models.TradeAccount.cash "Permalink to this definition")

Cash balance in the account

Type:

Optional\[str\]

accrued\_fees[#](#alpaca.trading.models.TradeAccount.accrued_fees "Permalink to this definition")

Fees accrued in this account

Type:

Optional\[str\]

pending\_transfer\_out[#](#alpaca.trading.models.TradeAccount.pending_transfer_out "Permalink to this definition")

Cash pending transfer out of this account

Type:

Optional\[str\]

pending\_transfer\_in[#](#alpaca.trading.models.TradeAccount.pending_transfer_in "Permalink to this definition")

Cash pending transfer into this account

Type:

Optional\[str\]

portfolio\_value[#](#alpaca.trading.models.TradeAccount.portfolio_value "Permalink to this definition")

Total value of cash + holding positions. (This field is deprecated. It is equivalent to the equity field.)

Type:

str

pattern\_day\_trader[#](#alpaca.trading.models.TradeAccount.pattern_day_trader "Permalink to this definition")

Whether the account is flagged as pattern day trader or not.

Type:

Optional\[bool\]

trading\_blocked[#](#alpaca.trading.models.TradeAccount.trading_blocked "Permalink to this definition")

If true, the account is not allowed to place orders.

Type:

Optional\[bool\]

transfers\_blocked[#](#alpaca.trading.models.TradeAccount.transfers_blocked "Permalink to this definition")

If true, the account is not allowed to request money transfers.

Type:

Optional\[bool\]

account\_blocked[#](#alpaca.trading.models.TradeAccount.account_blocked "Permalink to this definition")

If true, the account activity by user is prohibited.

Type:

Optional\[bool\]

created\_at[#](#alpaca.trading.models.TradeAccount.created_at "Permalink to this definition")

Timestamp this account was created at

Type:

Optional\[datetime\]

trade\_suspended\_by\_user[#](#alpaca.trading.models.TradeAccount.trade_suspended_by_user "Permalink to this definition")

If true, the account is not allowed to place orders.

Type:

Optional\[bool\]

multiplier[#](#alpaca.trading.models.TradeAccount.multiplier "Permalink to this definition")

Multiplier value for this account.

Type:

Optional\[str\]

shorting\_enabled[#](#alpaca.trading.models.TradeAccount.shorting_enabled "Permalink to this definition")

Flag to denote whether or not the account is permitted to short

Type:

Optional\[bool\]

equity[#](#alpaca.trading.models.TradeAccount.equity "Permalink to this definition")

This value is cash + long\_market\_value + short\_market\_value. This value isn’t calculated in the SDK it is computed on the server and we return the raw value here.

Type:

Optional\[str\]

last\_equity[#](#alpaca.trading.models.TradeAccount.last_equity "Permalink to this definition")

Equity as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

long\_market\_value[#](#alpaca.trading.models.TradeAccount.long_market_value "Permalink to this definition")

Real-time MtM value of all long positions held in the account

Type:

Optional\[str\]

short\_market\_value[#](#alpaca.trading.models.TradeAccount.short_market_value "Permalink to this definition")

Real-time MtM value of all short positions held in the account

Type:

Optional\[str\]

initial\_margin[#](#alpaca.trading.models.TradeAccount.initial_margin "Permalink to this definition")

Reg T initial margin requirement

Type:

Optional\[str\]

maintenance\_margin[#](#alpaca.trading.models.TradeAccount.maintenance_margin "Permalink to this definition")

Maintenance margin requirement

Type:

Optional\[str\]

last\_maintenance\_margin[#](#alpaca.trading.models.TradeAccount.last_maintenance_margin "Permalink to this definition")

Maintenance margin requirement on the previous trading day

Type:

Optional\[str\]

sma[#](#alpaca.trading.models.TradeAccount.sma "Permalink to this definition")

Value of Special Memorandum Account (will be used at a later date to provide additional buying\_power)

Type:

Optional\[str\]

daytrade\_count[#](#alpaca.trading.models.TradeAccount.daytrade_count "Permalink to this definition")

The current number of daytrades that have been made in the last 5 trading days (inclusive of today)

Type:

Optional\[int\]

options\_buying\_power[#](#alpaca.trading.models.TradeAccount.options_buying_power "Permalink to this definition")

Your buying power for options trading

Type:

Optional\[str\]

options\_approved\_level[#](#alpaca.trading.models.TradeAccount.options_approved_level "Permalink to this definition")

The options trading level that was approved for this account. 0=disabled, 1=Covered Call/Cash-Secured Put, 2=Long Call/Put, 3=Spreads/Straddles.

Type:

Optional\[int\]

options\_trading\_level[#](#alpaca.trading.models.TradeAccount.options_trading_level "Permalink to this definition")

The effective options trading level of the account. This is the minimum between account options\_approved\_level and account configurations max\_options\_trading\_level. 0=disabled, 1=Covered Call/Cash-Secured Put, 2=Long, 3=Spreads/Straddles.

Type:

Optional\[int\]

AccountConfiguration[#](#accountconfiguration "Permalink to this heading")
--------------------------------------------------------------------------

_class_ alpaca.trading.models.AccountConfiguration(_\*_, _dtbp\_check: [DTBPCheck](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.DTBPCheck "alpaca.trading.enums.DTBPCheck")_, _fractional\_trading: bool_, _max\_margin\_multiplier: str_, _no\_shorting: bool_, _pdt\_check: [PDTCheck](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PDTCheck "alpaca.trading.enums.PDTCheck")_, _suspend\_trade: bool_, _trade\_confirm\_email: [TradeConfirmationEmail](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TradeConfirmationEmail "alpaca.trading.enums.TradeConfirmationEmail")_, _ptp\_no\_exception\_entry: bool_, _max\_options\_trading\_level: Optional\[int\] \= None_)[#](#alpaca.trading.models.AccountConfiguration "Permalink to this definition")

Represents configuration options for a TradeAccount.

dtbp\_check[#](#alpaca.trading.models.AccountConfiguration.dtbp_check "Permalink to this definition")

Day Trade Buying Power Check. Controls Day Trading Margin Call (DTMC) checks.

Type:

[DTBPCheck](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.DTBPCheck "alpaca.trading.enums.DTBPCheck")

fractional\_trading[#](#alpaca.trading.models.AccountConfiguration.fractional_trading "Permalink to this definition")

If true, account is able to participate in fractional trading

Type:

bool

max\_margin\_multiplier[#](#alpaca.trading.models.AccountConfiguration.max_margin_multiplier "Permalink to this definition")

A number between 1-4 that represents your max margin multiplier

Type:

str

no\_shorting[#](#alpaca.trading.models.AccountConfiguration.no_shorting "Permalink to this definition")

If true then Account becomes long-only mode.

Type:

bool

pdt\_check[#](#alpaca.trading.models.AccountConfiguration.pdt_check "Permalink to this definition")

Controls Pattern Day Trader (PDT) checks.

Type:

[PDTCheck](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PDTCheck "alpaca.trading.enums.PDTCheck")

suspend\_trade[#](#alpaca.trading.models.AccountConfiguration.suspend_trade "Permalink to this definition")

If true Account becomes unable to submit new orders

Type:

bool

trade\_confirm\_email[#](#alpaca.trading.models.AccountConfiguration.trade_confirm_email "Permalink to this definition")

Controls whether Trade confirmation emails are sent.

Type:

[TradeConfirmationEmail](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TradeConfirmationEmail "alpaca.trading.enums.TradeConfirmationEmail")

ptp\_no\_exception\_entry[#](#alpaca.trading.models.AccountConfiguration.ptp_no_exception_entry "Permalink to this definition")

If set to true then Alpaca will accept orders for PTP symbols with no exception. Default is false.

Type:

bool

max\_options\_trading\_level[#](#alpaca.trading.models.AccountConfiguration.max_options_trading_level "Permalink to this definition")

The desired maximum options trading level. 0=disabled, 1=Covered Call/Cash-Secured Put, 2=Long Call/Put, 3=Spreads/Straddles.

Type:

Optional\[int\]

Watchlist[#](#watchlist "Permalink to this heading")
----------------------------------------------------

_class_ alpaca.trading.models.Watchlist(_\*_, _id: UUID_, _account\_id: UUID_, _name: str_, _created\_at: datetime_, _updated\_at: datetime_, _assets: Optional\[List\[[Asset](#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\]\] \= None_)[#](#alpaca.trading.models.Watchlist "Permalink to this definition")

A watchlist is an ordered list of assets. An account can have multiple watchlists. Learn more about watchlists in the documentation. [https://alpaca.markets/docs/api-references/trading-api/watchlist/](https://alpaca.markets/docs/api-references/trading-api/watchlist/)

account\_id[#](#alpaca.trading.models.Watchlist.account_id "Permalink to this definition")

The uuid identifying the account the watchlist belongs to

Type:

UUID

id[#](#alpaca.trading.models.Watchlist.id "Permalink to this definition")

The unique identifier for the watchlist

Type:

UUID

name[#](#alpaca.trading.models.Watchlist.name "Permalink to this definition")

An arbitrary string up to 64 characters identifying the watchlist

Type:

str

created\_at[#](#alpaca.trading.models.Watchlist.created_at "Permalink to this definition")

When the watchlist was created

Type:

datetime

updated\_at[#](#alpaca.trading.models.Watchlist.updated_at "Permalink to this definition")

When the watchlist was last updated

Type:

datetime

assets[#](#alpaca.trading.models.Watchlist.assets "Permalink to this definition")

The assets in the watchlist, not returned from all endpoints

Type:

Optional\[List\[[Asset](#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\]\]

Clock[#](#clock "Permalink to this heading")
--------------------------------------------

_class_ alpaca.trading.models.Clock(_\*_, _timestamp: datetime_, _is\_open: bool_, _next\_open: datetime_, _next\_close: datetime_)[#](#alpaca.trading.models.Clock "Permalink to this definition")

The market clock for US equity markets. Timestamps are in eastern time.

timestamp[#](#alpaca.trading.models.Clock.timestamp "Permalink to this definition")

The current timestamp.

Type:

datetime

is\_open[#](#alpaca.trading.models.Clock.is_open "Permalink to this definition")

Whether the market is currently open.

Type:

bool

next\_open[#](#alpaca.trading.models.Clock.next_open "Permalink to this definition")

The timestamp when the market will next open.

Type:

datetime

next\_close[#](#alpaca.trading.models.Clock.next_close "Permalink to this definition")

The timestamp when the market will next close.

Type:

datetime

Calendar[#](#calendar "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.trading.models.Calendar(_\*_, _date: date_, _open: datetime_, _close: datetime_)[#](#alpaca.trading.models.Calendar "Permalink to this definition")

The market calendar for equity markets. Describes the market open and close time on a given day.

NonTradeActivity[#](#nontradeactivity "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.trading.models.NonTradeActivity(_\*args_, _id: str_, _account\_id: UUID_, _activity\_type: [ActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.ActivityType "alpaca.trading.enums.ActivityType")_, _date: date_, _net\_amount: float_, _description: str_, _status: Optional\[[NonTradeActivityStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.NonTradeActivityStatus "alpaca.trading.enums.NonTradeActivityStatus")\] \= None_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _price: Optional\[float\] \= None_, _per\_share\_amount: Optional\[float\] \= None_)[#](#alpaca.trading.models.NonTradeActivity "Permalink to this definition")

A NonTradeActivity represents an Activity that happened for an account that doesn’t have to do with orders or trades.

date[#](#alpaca.trading.models.NonTradeActivity.date "Permalink to this definition")

The date on which the activity occurred or on which the transaction associated with the activity settled.

Type:

date

net\_amount[#](#alpaca.trading.models.NonTradeActivity.net_amount "Permalink to this definition")

The net amount of money (positive or negative) associated with the activity.

Type:

float

description[#](#alpaca.trading.models.NonTradeActivity.description "Permalink to this definition")

Extra description of the NTA if needed. Can be empty string “”

Type:

str

status[#](#alpaca.trading.models.NonTradeActivity.status "Permalink to this definition")

Status of the activity. Not present for all activity types.

Type:

[NonTradeActivityStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.NonTradeActivityStatus "alpaca.trading.enums.NonTradeActivityStatus")

symbol[#](#alpaca.trading.models.NonTradeActivity.symbol "Permalink to this definition")

The symbol of the security involved with the activity. Not present for all activity types.

Type:

Optional\[str\]

qty[#](#alpaca.trading.models.NonTradeActivity.qty "Permalink to this definition")

For dividend activities, the number of shares that contributed to the payment. Not present for other activity types.

Type:

Optional\[float\]

price[#](#alpaca.trading.models.NonTradeActivity.price "Permalink to this definition")

Type:

Optional\[float\]

For dividend activities, the average amount paid per share. Not present for other activity types.

Type:

Optional\[float\]

TradeActivity[#](#tradeactivity "Permalink to this heading")
------------------------------------------------------------

_class_ alpaca.trading.models.TradeActivity(_\*args_, _id: str_, _account\_id: UUID_, _activity\_type: [ActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.ActivityType "alpaca.trading.enums.ActivityType")_, _transaction\_time: datetime_, _type: [TradeActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TradeActivityType "alpaca.trading.enums.TradeActivityType")_, _price: float_, _qty: float_, _side: [OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")_, _symbol: str_, _leaves\_qty: float_, _order\_id: UUID_, _cum\_qty: float_, _order\_status: [OrderStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderStatus "alpaca.trading.enums.OrderStatus")_)[#](#alpaca.trading.models.TradeActivity "Permalink to this definition")

Represents information for TradeActivities. TradeActivities are Activities that pertain to trades that happened for an account. IE Fills or partial fills for orders.

transaction\_time[#](#alpaca.trading.models.TradeActivity.transaction_time "Permalink to this definition")

The time and date of when this trade was processed

Type:

datetime

type[#](#alpaca.trading.models.TradeActivity.type "Permalink to this definition")

What kind of trade this TradeActivity represents. See TradeActivityType for more details

Type:

[TradeActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TradeActivityType "alpaca.trading.enums.TradeActivityType")

price[#](#alpaca.trading.models.TradeActivity.price "Permalink to this definition")

The per-share price that the trade was executed at.

Type:

float

qty[#](#alpaca.trading.models.TradeActivity.qty "Permalink to this definition")

The number of shares involved in the trade execution.

Type:

float

side[#](#alpaca.trading.models.TradeActivity.side "Permalink to this definition")

What side the trade this TradeActivity represents was on. See OrderSide for more information

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

symbol[#](#alpaca.trading.models.TradeActivity.symbol "Permalink to this definition")

The symbol of the asset that was traded

Type:

str

leaves\_qty[#](#alpaca.trading.models.TradeActivity.leaves_qty "Permalink to this definition")

For partially filled orders, the quantity of shares that are left to be filled. Will be 0 if order was not a partially filled order

Type:

float

order\_id[#](#alpaca.trading.models.TradeActivity.order_id "Permalink to this definition")

The ID for the order filled

Type:

UUID

cum\_qty[#](#alpaca.trading.models.TradeActivity.cum_qty "Permalink to this definition")

The cumulative quantity of shares involved in the execution.

Type:

float

order\_status[#](#alpaca.trading.models.TradeActivity.order_status "Permalink to this definition")

The status of the order that executed the trade. See OrderStatus for more details

Type:

[OrderStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderStatus "alpaca.trading.enums.OrderStatus")

PortfolioHistory[#](#portfoliohistory "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.trading.models.PortfolioHistory(_\*_, _timestamp: List\[int\]_, _equity: List\[float\]_, _profit\_loss: List\[float\]_, _profit\_loss\_pct: List\[Optional\[float\]\]_, _base\_value: float_, _timeframe: str_, _cashflow: Dict\[[ActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.ActivityType "alpaca.trading.enums.ActivityType"), List\[float\]\] \= {}_)[#](#alpaca.trading.models.PortfolioHistory "Permalink to this definition")

Contains information about the value of a portfolio over time.

timestamp[#](#alpaca.trading.models.PortfolioHistory.timestamp "Permalink to this definition")

Time of each data element, left-labeled (the beginning of time window).

Type:

List\[int\]

equity[#](#alpaca.trading.models.PortfolioHistory.equity "Permalink to this definition")

Equity value of the account in dollar amount as of the end of each time window.

Type:

List\[float\]

profit\_loss[#](#alpaca.trading.models.PortfolioHistory.profit_loss "Permalink to this definition")

Profit/loss in dollar from the base value.

Type:

List\[float\]

profit\_loss\_pct[#](#alpaca.trading.models.PortfolioHistory.profit_loss_pct "Permalink to this definition")

Profit/loss in percentage from the base value.

Type:

List\[Optional\[float\]\]

base\_value[#](#alpaca.trading.models.PortfolioHistory.base_value "Permalink to this definition")

Basis in dollar of the profit loss calculation.

Type:

float

timeframe[#](#alpaca.trading.models.PortfolioHistory.timeframe "Permalink to this definition")

Time window size of each data element.

Type:

str

cashflow[#](#alpaca.trading.models.PortfolioHistory.cashflow "Permalink to this definition")

Cash flow amounts per activity type, if any.

Type:

Dict\[[ActivityType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.ActivityType "alpaca.trading.enums.ActivityType"), List\[float\]\]

ClosePositionResponse[#](#closepositionresponse "Permalink to this heading")
----------------------------------------------------------------------------

_class_ alpaca.trading.models.ClosePositionResponse(_\*_, _order\_id: Optional\[UUID\] \= None_, _status: Optional\[int\] \= None_, _symbol: Optional\[str\] \= None_, _body: Union\[[FailedClosePositionDetails](#alpaca.trading.models.FailedClosePositionDetails "alpaca.trading.models.FailedClosePositionDetails"), [Order](#alpaca.trading.models.Order "alpaca.trading.models.Order")\]_)[#](#alpaca.trading.models.ClosePositionResponse "Permalink to this definition")

API response for a close position request. .. attribute:: order\_id

> ID of order that was created to liquidate the position.
> 
> type:
> 
> Optional\[UUID\]

status[#](#alpaca.trading.models.ClosePositionResponse.status "Permalink to this definition")

Status code corresponding to the request to liquidate the position.

Type:

Optional\[int\]

symbol[#](#alpaca.trading.models.ClosePositionResponse.symbol "Permalink to this definition")

The symbol of the position being closed.

Type:

Optional\[str\]

body[#](#alpaca.trading.models.ClosePositionResponse.body "Permalink to this definition")

Information relating to the successful or unsuccessful closing of the position.

Type:

Optional\[dict\]

FailedClosePositionDetails[#](#failedclosepositiondetails "Permalink to this heading")
--------------------------------------------------------------------------------------

_class_ alpaca.trading.models.FailedClosePositionDetails(_\*_, _code: int_, _message: str_, _available: Optional\[float\] \= None_, _existing\_qty: Optional\[float\] \= None_, _held\_for\_orders: Optional\[float\] \= None_, _symbol: Optional\[str\] \= None_)[#](#alpaca.trading.models.FailedClosePositionDetails "Permalink to this definition")

API response for failed close position request.

available[#](#alpaca.trading.models.FailedClosePositionDetails.available "Permalink to this definition")

The qty available.

Type:

float

code[#](#alpaca.trading.models.FailedClosePositionDetails.code "Permalink to this definition")

The status code.

Type:

int

existing\_qty[#](#alpaca.trading.models.FailedClosePositionDetails.existing_qty "Permalink to this definition")

The total qty in account.

Type:

float

held\_for\_orders[#](#alpaca.trading.models.FailedClosePositionDetails.held_for_orders "Permalink to this definition")

The qty locked up in existing orders.

Type:

float

message[#](#alpaca.trading.models.FailedClosePositionDetails.message "Permalink to this definition")

Message for failed request.

Type:

str

symbol[#](#alpaca.trading.models.FailedClosePositionDetails.symbol "Permalink to this definition")

The symbol for the request.

Type:

str

CorporateActionAnnouncement[#](#corporateactionannouncement "Permalink to this heading")
----------------------------------------------------------------------------------------

_class_ alpaca.trading.models.CorporateActionAnnouncement(_\*_, _id: UUID_, _corporate\_action\_id: str_, _ca\_type: [CorporateActionType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionType "alpaca.trading.enums.CorporateActionType")_, _ca\_sub\_type: [CorporateActionSubType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionSubType "alpaca.trading.enums.CorporateActionSubType")_, _initiating\_symbol: str_, _initiating\_original\_cusip: str_, _target\_symbol: Optional\[str\] \= None_, _target\_original\_cusip: Optional\[str\] \= None_, _declaration\_date: Optional\[date\] \= None_, _ex\_date: Optional\[date\] \= None_, _record\_date: Optional\[date\] \= None_, _payable\_date: Optional\[date\] \= None_, _cash: float_, _old\_rate: float_, _new\_rate: float_)[#](#alpaca.trading.models.CorporateActionAnnouncement "Permalink to this definition")

An announcement of a corporate action. Corporate actions are events like dividend payouts, mergers and stock splits.

id[#](#alpaca.trading.models.CorporateActionAnnouncement.id "Permalink to this definition")

The unique identifier for this single announcement.

Type:

UUID

corporate\_action\_id[#](#alpaca.trading.models.CorporateActionAnnouncement.corporate_action_id "Permalink to this definition")

ID that remains consistent across all announcements for the same corporate action.

Type:

str

ca\_type[#](#alpaca.trading.models.CorporateActionAnnouncement.ca_type "Permalink to this definition")

The type of corporate action that was announced.

Type:

[CorporateActionType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionType "alpaca.trading.enums.CorporateActionType")

ca\_sub\_type[#](#alpaca.trading.models.CorporateActionAnnouncement.ca_sub_type "Permalink to this definition")

The specific subtype of corporate action that was announced.

Type:

[CorporateActionSubType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionSubType "alpaca.trading.enums.CorporateActionSubType")

initiating\_symbol[#](#alpaca.trading.models.CorporateActionAnnouncement.initiating_symbol "Permalink to this definition")

Symbol of the company initiating the announcement.

Type:

str

initiating\_original\_cusip[#](#alpaca.trading.models.CorporateActionAnnouncement.initiating_original_cusip "Permalink to this definition")

CUSIP of the company initiating the announcement.

Type:

str

target\_symbol[#](#alpaca.trading.models.CorporateActionAnnouncement.target_symbol "Permalink to this definition")

Symbol of the child company involved in the announcement.

Type:

Optional\[str\]

target\_original\_cusip[#](#alpaca.trading.models.CorporateActionAnnouncement.target_original_cusip "Permalink to this definition")

CUSIP of the child company involved in the announcement.

Type:

Optional\[str\]

declaration\_date[#](#alpaca.trading.models.CorporateActionAnnouncement.declaration_date "Permalink to this definition")

Date the corporate action or subsequent terms update was announced.

Type:

Optional\[date\]

ex\_date[#](#alpaca.trading.models.CorporateActionAnnouncement.ex_date "Permalink to this definition")

The first date that purchasing a security will not result in a corporate action entitlement.

Type:

Optional\[date\]

record\_date[#](#alpaca.trading.models.CorporateActionAnnouncement.record_date "Permalink to this definition")

The date an account must hold a settled position in the security in order to receive the corporate action entitlement.

Type:

Optional\[date\]

payable\_date[#](#alpaca.trading.models.CorporateActionAnnouncement.payable_date "Permalink to this definition")

The date the announcement will take effect. On this date, account stock and cash balances are expected to be processed accordingly.

Type:

Optional\[date\]

cash[#](#alpaca.trading.models.CorporateActionAnnouncement.cash "Permalink to this definition")

The amount of cash to be paid per share held by an account on the record date.

Type:

float

old\_rate[#](#alpaca.trading.models.CorporateActionAnnouncement.old_rate "Permalink to this definition")

The denominator to determine any quantity change ratios in positions.

Type:

float

new\_rate[#](#alpaca.trading.models.CorporateActionAnnouncement.new_rate "Permalink to this definition")

The numerator to determine any quantity change ratios in positions.

Type:

float</content>
</page>

<page>
  <title>Enums - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/enums.html</url>
  <content>Toggle table of contents sidebar

OrderClass[#](#orderclass "Permalink to this heading")
------------------------------------------------------

_enum_ alpaca.trading.enums.OrderClass(_value_)[#](#alpaca.trading.enums.OrderClass "Permalink to this definition")

Represents what class of order this is.

The order classes supported by Alpaca vary based on the order’s security type. The following provides a comprehensive breakdown of the supported order classes for each category: - Equity trading: simple (or “”), oco, oto, bracket. - Options trading: simple (or “”), mleg (required for multi-leg complex options strategies). - Crypto trading: simple (or “”).

Member Type:

`str`

Valid values are as follows:

SIMPLE _\= <OrderClass.SIMPLE: 'simple'>_[#](#alpaca.trading.enums.OrderClass.SIMPLE "Permalink to this definition")

MLEG _\= <OrderClass.MLEG: 'mleg'>_[#](#alpaca.trading.enums.OrderClass.MLEG "Permalink to this definition")

BRACKET _\= <OrderClass.BRACKET: 'bracket'>_[#](#alpaca.trading.enums.OrderClass.BRACKET "Permalink to this definition")

OCO _\= <OrderClass.OCO: 'oco'>_[#](#alpaca.trading.enums.OrderClass.OCO "Permalink to this definition")

OTO _\= <OrderClass.OTO: 'oto'>_[#](#alpaca.trading.enums.OrderClass.OTO "Permalink to this definition")

OrderType[#](#ordertype "Permalink to this heading")
----------------------------------------------------

_enum_ alpaca.trading.enums.OrderType(_value_)[#](#alpaca.trading.enums.OrderType "Permalink to this definition")

Represents what type of order this is.

The order types supported by Alpaca vary based on the order’s security type. The following provides a comprehensive breakdown of the supported order types for each category: - Equity trading: market, limit, stop, stop\_limit, trailing\_stop. - Options trading: market, limit, stop, stop\_limit. - Crypto trading: market, limit, stop\_limit.

Member Type:

`str`

Valid values are as follows:

MARKET _\= <OrderType.MARKET: 'market'>_[#](#alpaca.trading.enums.OrderType.MARKET "Permalink to this definition")

LIMIT _\= <OrderType.LIMIT: 'limit'>_[#](#alpaca.trading.enums.OrderType.LIMIT "Permalink to this definition")

STOP _\= <OrderType.STOP: 'stop'>_[#](#alpaca.trading.enums.OrderType.STOP "Permalink to this definition")

STOP\_LIMIT _\= <OrderType.STOP\_LIMIT: 'stop\_limit'>_[#](#alpaca.trading.enums.OrderType.STOP_LIMIT "Permalink to this definition")

TRAILING\_STOP _\= <OrderType.TRAILING\_STOP: 'trailing\_stop'>_[#](#alpaca.trading.enums.OrderType.TRAILING_STOP "Permalink to this definition")

OrderSide[#](#orderside "Permalink to this heading")
----------------------------------------------------

_enum_ alpaca.trading.enums.OrderSide(_value_)[#](#alpaca.trading.enums.OrderSide "Permalink to this definition")

Represents what side this order was executed on.

Member Type:

`str`

Valid values are as follows:

BUY _\= <OrderSide.BUY: 'buy'>_[#](#alpaca.trading.enums.OrderSide.BUY "Permalink to this definition")

SELL _\= <OrderSide.SELL: 'sell'>_[#](#alpaca.trading.enums.OrderSide.SELL "Permalink to this definition")

TimeInForce[#](#timeinforce "Permalink to this heading")
--------------------------------------------------------

_enum_ alpaca.trading.enums.TimeInForce(_value_)[#](#alpaca.trading.enums.TimeInForce "Permalink to this definition")

Represents the various time in force options for an Order.

The Time-In-Force values supported by Alpaca vary based on the order’s security type. Here is a breakdown of the supported TIFs for each specific security type: - Equity trading: day, gtc, opg, cls, ioc, fok. - Options trading: day. - Crypto trading: gtc, ioc. Below are the descriptions of each TIF: - day: A day order is eligible for execution only on the day it is live. By default, the order is only valid during Regular Trading Hours (9:30am - 4:00pm ET). If unfilled after the closing auction, it is automatically canceled. If submitted after the close, it is queued and submitted the following trading day. However, if marked as eligible for extended hours, the order can also execute during supported extended hours. - gtc: The order is good until canceled. Non-marketable GTC limit orders are subject to price adjustments to offset corporate actions affecting the issue. We do not currently support Do Not Reduce(DNR) orders to opt out of such price adjustments. - opg: Use this TIF with a market/limit order type to submit “market on open” (MOO) and “limit on open” (LOO) orders. This order is eligible to execute only in the market opening auction. Any unfilled orders after the open will be cancelled. OPG orders submitted after 9:28am but before 7:00pm ET will be rejected. OPG orders submitted after 7:00pm will be queued and routed to the following day’s opening auction. On open/on close orders are routed to the primary exchange. Such orders do not necessarily execute exactly at 9:30am / 4:00pm ET but execute per the exchange’s auction rules. - cls: Use this TIF with a market/limit order type to submit “market on close” (MOC) and “limit on close” (LOC) orders. This order is eligible to execute only in the market closing auction. Any unfilled orders after the close will be cancelled. CLS orders submitted after 3:50pm but before 7:00pm ET will be rejected. CLS orders submitted after 7:00pm will be queued and routed to the following day’s closing auction. Only available with API v2. - ioc: An Immediate Or Cancel (IOC) order requires all or part of the order to be executed immediately. Any unfilled portion of the order is canceled. Only available with API v2. Most market makers who receive IOC orders will attempt to fill the order on a principal basis only, and cancel any unfilled balance. On occasion, this can result in the entire order being cancelled if the market maker does not have any existing inventory of the security in question. - fok: A Fill or Kill (FOK) order is only executed if the entire order quantity can be filled, otherwise the order is canceled. Only available with API v2.

Member Type:

`str`

Valid values are as follows:

DAY _\= <TimeInForce.DAY: 'day'>_[#](#alpaca.trading.enums.TimeInForce.DAY "Permalink to this definition")

GTC _\= <TimeInForce.GTC: 'gtc'>_[#](#alpaca.trading.enums.TimeInForce.GTC "Permalink to this definition")

OPG _\= <TimeInForce.OPG: 'opg'>_[#](#alpaca.trading.enums.TimeInForce.OPG "Permalink to this definition")

CLS _\= <TimeInForce.CLS: 'cls'>_[#](#alpaca.trading.enums.TimeInForce.CLS "Permalink to this definition")

IOC _\= <TimeInForce.IOC: 'ioc'>_[#](#alpaca.trading.enums.TimeInForce.IOC "Permalink to this definition")

FOK _\= <TimeInForce.FOK: 'fok'>_[#](#alpaca.trading.enums.TimeInForce.FOK "Permalink to this definition")

OrderStatus[#](#orderstatus "Permalink to this heading")
--------------------------------------------------------

_enum_ alpaca.trading.enums.OrderStatus(_value_)[#](#alpaca.trading.enums.OrderStatus "Permalink to this definition")

Represents the various states an Order can be in.

please see [https://alpaca.markets/docs/api-references/broker-api/trading/orders/#order-status](https://alpaca.markets/docs/api-references/broker-api/trading/orders/#order-status) for more info

Member Type:

`str`

Valid values are as follows:

NEW _\= <OrderStatus.NEW: 'new'>_[#](#alpaca.trading.enums.OrderStatus.NEW "Permalink to this definition")

PARTIALLY\_FILLED _\= <OrderStatus.PARTIALLY\_FILLED: 'partially\_filled'>_[#](#alpaca.trading.enums.OrderStatus.PARTIALLY_FILLED "Permalink to this definition")

FILLED _\= <OrderStatus.FILLED: 'filled'>_[#](#alpaca.trading.enums.OrderStatus.FILLED "Permalink to this definition")

DONE\_FOR\_DAY _\= <OrderStatus.DONE\_FOR\_DAY: 'done\_for\_day'>_[#](#alpaca.trading.enums.OrderStatus.DONE_FOR_DAY "Permalink to this definition")

CANCELED _\= <OrderStatus.CANCELED: 'canceled'>_[#](#alpaca.trading.enums.OrderStatus.CANCELED "Permalink to this definition")

EXPIRED _\= <OrderStatus.EXPIRED: 'expired'>_[#](#alpaca.trading.enums.OrderStatus.EXPIRED "Permalink to this definition")

REPLACED _\= <OrderStatus.REPLACED: 'replaced'>_[#](#alpaca.trading.enums.OrderStatus.REPLACED "Permalink to this definition")

PENDING\_CANCEL _\= <OrderStatus.PENDING\_CANCEL: 'pending\_cancel'>_[#](#alpaca.trading.enums.OrderStatus.PENDING_CANCEL "Permalink to this definition")

PENDING\_REPLACE _\= <OrderStatus.PENDING\_REPLACE: 'pending\_replace'>_[#](#alpaca.trading.enums.OrderStatus.PENDING_REPLACE "Permalink to this definition")

PENDING\_REVIEW _\= <OrderStatus.PENDING\_REVIEW: 'pending\_review'>_[#](#alpaca.trading.enums.OrderStatus.PENDING_REVIEW "Permalink to this definition")

ACCEPTED _\= <OrderStatus.ACCEPTED: 'accepted'>_[#](#alpaca.trading.enums.OrderStatus.ACCEPTED "Permalink to this definition")

PENDING\_NEW _\= <OrderStatus.PENDING\_NEW: 'pending\_new'>_[#](#alpaca.trading.enums.OrderStatus.PENDING_NEW "Permalink to this definition")

ACCEPTED\_FOR\_BIDDING _\= <OrderStatus.ACCEPTED\_FOR\_BIDDING: 'accepted\_for\_bidding'>_[#](#alpaca.trading.enums.OrderStatus.ACCEPTED_FOR_BIDDING "Permalink to this definition")

STOPPED _\= <OrderStatus.STOPPED: 'stopped'>_[#](#alpaca.trading.enums.OrderStatus.STOPPED "Permalink to this definition")

REJECTED _\= <OrderStatus.REJECTED: 'rejected'>_[#](#alpaca.trading.enums.OrderStatus.REJECTED "Permalink to this definition")

SUSPENDED _\= <OrderStatus.SUSPENDED: 'suspended'>_[#](#alpaca.trading.enums.OrderStatus.SUSPENDED "Permalink to this definition")

CALCULATED _\= <OrderStatus.CALCULATED: 'calculated'>_[#](#alpaca.trading.enums.OrderStatus.CALCULATED "Permalink to this definition")

HELD _\= <OrderStatus.HELD: 'held'>_[#](#alpaca.trading.enums.OrderStatus.HELD "Permalink to this definition")

AssetClass[#](#assetclass "Permalink to this heading")
------------------------------------------------------

_enum_ alpaca.trading.enums.AssetClass(_value_)[#](#alpaca.trading.enums.AssetClass "Permalink to this definition")

This represents the category to which the asset belongs to. It serves to identify the nature of the financial instrument, with options including “us\_equity” for U.S. equities, “us\_option” for U.S. options, and “crypto” for cryptocurrencies.

Member Type:

`str`

Valid values are as follows:

US\_EQUITY _\= <AssetClass.US\_EQUITY: 'us\_equity'>_[#](#alpaca.trading.enums.AssetClass.US_EQUITY "Permalink to this definition")

US\_OPTION _\= <AssetClass.US\_OPTION: 'us\_option'>_[#](#alpaca.trading.enums.AssetClass.US_OPTION "Permalink to this definition")

CRYPTO _\= <AssetClass.CRYPTO: 'crypto'>_[#](#alpaca.trading.enums.AssetClass.CRYPTO "Permalink to this definition")

AssetStatus[#](#assetstatus "Permalink to this heading")
--------------------------------------------------------

_enum_ alpaca.trading.enums.AssetStatus(_value_)[#](#alpaca.trading.enums.AssetStatus "Permalink to this definition")

Represents the various states for an Asset’s lifecycle

Member Type:

`str`

Valid values are as follows:

ACTIVE _\= <AssetStatus.ACTIVE: 'active'>_[#](#alpaca.trading.enums.AssetStatus.ACTIVE "Permalink to this definition")

INACTIVE _\= <AssetStatus.INACTIVE: 'inactive'>_[#](#alpaca.trading.enums.AssetStatus.INACTIVE "Permalink to this definition")

AssetExchange[#](#assetexchange "Permalink to this heading")
------------------------------------------------------------

_enum_ alpaca.trading.enums.AssetExchange(_value_)[#](#alpaca.trading.enums.AssetExchange "Permalink to this definition")

Represents the current exchanges Alpaca supports.

Member Type:

`str`

Valid values are as follows:

AMEX _\= <AssetExchange.AMEX: 'AMEX'>_[#](#alpaca.trading.enums.AssetExchange.AMEX "Permalink to this definition")

ARCA _\= <AssetExchange.ARCA: 'ARCA'>_[#](#alpaca.trading.enums.AssetExchange.ARCA "Permalink to this definition")

BATS _\= <AssetExchange.BATS: 'BATS'>_[#](#alpaca.trading.enums.AssetExchange.BATS "Permalink to this definition")

NYSE _\= <AssetExchange.NYSE: 'NYSE'>_[#](#alpaca.trading.enums.AssetExchange.NYSE "Permalink to this definition")

NASDAQ _\= <AssetExchange.NASDAQ: 'NASDAQ'>_[#](#alpaca.trading.enums.AssetExchange.NASDAQ "Permalink to this definition")

NYSEARCA _\= <AssetExchange.NYSEARCA: 'NYSEARCA'>_[#](#alpaca.trading.enums.AssetExchange.NYSEARCA "Permalink to this definition")

FTXU _\= <AssetExchange.FTXU: 'FTXU'>_[#](#alpaca.trading.enums.AssetExchange.FTXU "Permalink to this definition")

CBSE _\= <AssetExchange.CBSE: 'CBSE'>_[#](#alpaca.trading.enums.AssetExchange.CBSE "Permalink to this definition")

GNSS _\= <AssetExchange.GNSS: 'GNSS'>_[#](#alpaca.trading.enums.AssetExchange.GNSS "Permalink to this definition")

ERSX _\= <AssetExchange.ERSX: 'ERSX'>_[#](#alpaca.trading.enums.AssetExchange.ERSX "Permalink to this definition")

OTC _\= <AssetExchange.OTC: 'OTC'>_[#](#alpaca.trading.enums.AssetExchange.OTC "Permalink to this definition")

CRYPTO _\= <AssetExchange.CRYPTO: 'CRYPTO'>_[#](#alpaca.trading.enums.AssetExchange.CRYPTO "Permalink to this definition")

EMPTY _\= <AssetExchange.EMPTY: ''>_[#](#alpaca.trading.enums.AssetExchange.EMPTY "Permalink to this definition")

PositionSide[#](#positionside "Permalink to this heading")
----------------------------------------------------------

_enum_ alpaca.trading.enums.PositionSide(_value_)[#](#alpaca.trading.enums.PositionSide "Permalink to this definition")

Represents what side this position is.

Member Type:

`str`

Valid values are as follows:

SHORT _\= <PositionSide.SHORT: 'short'>_[#](#alpaca.trading.enums.PositionSide.SHORT "Permalink to this definition")

LONG _\= <PositionSide.LONG: 'long'>_[#](#alpaca.trading.enums.PositionSide.LONG "Permalink to this definition")

AccountStatus[#](#accountstatus "Permalink to this heading")
------------------------------------------------------------

_enum_ alpaca.trading.enums.AccountStatus(_value_)[#](#alpaca.trading.enums.AccountStatus "Permalink to this definition")

The various statuses each brokerage account can take during its lifetime

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#account-status](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#account-status)

Member Type:

`str`

Valid values are as follows:

ACCOUNT\_CLOSED _\= <AccountStatus.ACCOUNT\_CLOSED: 'ACCOUNT\_CLOSED'>_[#](#alpaca.trading.enums.AccountStatus.ACCOUNT_CLOSED "Permalink to this definition")

ACCOUNT\_UPDATED _\= <AccountStatus.ACCOUNT\_UPDATED: 'ACCOUNT\_UPDATED'>_[#](#alpaca.trading.enums.AccountStatus.ACCOUNT_UPDATED "Permalink to this definition")

ACTION\_REQUIRED _\= <AccountStatus.ACTION\_REQUIRED: 'ACTION\_REQUIRED'>_[#](#alpaca.trading.enums.AccountStatus.ACTION_REQUIRED "Permalink to this definition")

ACTIVE _\= <AccountStatus.ACTIVE: 'ACTIVE'>_[#](#alpaca.trading.enums.AccountStatus.ACTIVE "Permalink to this definition")

AML\_REVIEW _\= <AccountStatus.AML\_REVIEW: 'AML\_REVIEW'>_[#](#alpaca.trading.enums.AccountStatus.AML_REVIEW "Permalink to this definition")

APPROVAL\_PENDING _\= <AccountStatus.APPROVAL\_PENDING: 'APPROVAL\_PENDING'>_[#](#alpaca.trading.enums.AccountStatus.APPROVAL_PENDING "Permalink to this definition")

APPROVED _\= <AccountStatus.APPROVED: 'APPROVED'>_[#](#alpaca.trading.enums.AccountStatus.APPROVED "Permalink to this definition")

DISABLED _\= <AccountStatus.DISABLED: 'DISABLED'>_[#](#alpaca.trading.enums.AccountStatus.DISABLED "Permalink to this definition")

DISABLE\_PENDING _\= <AccountStatus.DISABLE\_PENDING: 'DISABLE\_PENDING'>_[#](#alpaca.trading.enums.AccountStatus.DISABLE_PENDING "Permalink to this definition")

EDITED _\= <AccountStatus.EDITED: 'EDITED'>_[#](#alpaca.trading.enums.AccountStatus.EDITED "Permalink to this definition")

INACTIVE _\= <AccountStatus.INACTIVE: 'INACTIVE'>_[#](#alpaca.trading.enums.AccountStatus.INACTIVE "Permalink to this definition")

KYC\_SUBMITTED _\= <AccountStatus.KYC\_SUBMITTED: 'KYC\_SUBMITTED'>_[#](#alpaca.trading.enums.AccountStatus.KYC_SUBMITTED "Permalink to this definition")

LIMITED _\= <AccountStatus.LIMITED: 'LIMITED'>_[#](#alpaca.trading.enums.AccountStatus.LIMITED "Permalink to this definition")

ONBOARDING _\= <AccountStatus.ONBOARDING: 'ONBOARDING'>_[#](#alpaca.trading.enums.AccountStatus.ONBOARDING "Permalink to this definition")

PAPER\_ONLY _\= <AccountStatus.PAPER\_ONLY: 'PAPER\_ONLY'>_[#](#alpaca.trading.enums.AccountStatus.PAPER_ONLY "Permalink to this definition")

REAPPROVAL\_PENDING _\= <AccountStatus.REAPPROVAL\_PENDING: 'REAPPROVAL\_PENDING'>_[#](#alpaca.trading.enums.AccountStatus.REAPPROVAL_PENDING "Permalink to this definition")

REJECTED _\= <AccountStatus.REJECTED: 'REJECTED'>_[#](#alpaca.trading.enums.AccountStatus.REJECTED "Permalink to this definition")

RESUBMITTED _\= <AccountStatus.RESUBMITTED: 'RESUBMITTED'>_[#](#alpaca.trading.enums.AccountStatus.RESUBMITTED "Permalink to this definition")

SIGNED\_UP _\= <AccountStatus.SIGNED\_UP: 'SIGNED\_UP'>_[#](#alpaca.trading.enums.AccountStatus.SIGNED_UP "Permalink to this definition")

SUBMISSION\_FAILED _\= <AccountStatus.SUBMISSION\_FAILED: 'SUBMISSION\_FAILED'>_[#](#alpaca.trading.enums.AccountStatus.SUBMISSION_FAILED "Permalink to this definition")

SUBMITTED _\= <AccountStatus.SUBMITTED: 'SUBMITTED'>_[#](#alpaca.trading.enums.AccountStatus.SUBMITTED "Permalink to this definition")

ActivityType[#](#activitytype "Permalink to this heading")
----------------------------------------------------------

_enum_ alpaca.trading.enums.ActivityType(_value_)[#](#alpaca.trading.enums.ActivityType "Permalink to this definition")

Represents what kind of Activity an instance of TradeActivity or NonTradeActivity is.

Please see [https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#enumactivitytype](https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#enumactivitytype) for descriptions of each of the types

Member Type:

`str`

Valid values are as follows:

FILL _\= <ActivityType.FILL: 'FILL'>_[#](#alpaca.trading.enums.ActivityType.FILL "Permalink to this definition")

ACATC _\= <ActivityType.ACATC: 'ACATC'>_[#](#alpaca.trading.enums.ActivityType.ACATC "Permalink to this definition")

ACATS _\= <ActivityType.ACATS: 'ACATS'>_[#](#alpaca.trading.enums.ActivityType.ACATS "Permalink to this definition")

CFEE _\= <ActivityType.CFEE: 'CFEE'>_[#](#alpaca.trading.enums.ActivityType.CFEE "Permalink to this definition")

CIL _\= <ActivityType.CIL: 'CIL'>_[#](#alpaca.trading.enums.ActivityType.CIL "Permalink to this definition")

CSD _\= <ActivityType.CSD: 'CSD'>_[#](#alpaca.trading.enums.ActivityType.CSD "Permalink to this definition")

CSW _\= <ActivityType.CSW: 'CSW'>_[#](#alpaca.trading.enums.ActivityType.CSW "Permalink to this definition")

DIV _\= <ActivityType.DIV: 'DIV'>_[#](#alpaca.trading.enums.ActivityType.DIV "Permalink to this definition")

DIVCGL _\= <ActivityType.DIVCGL: 'DIVCGL'>_[#](#alpaca.trading.enums.ActivityType.DIVCGL "Permalink to this definition")

DIVCGS _\= <ActivityType.DIVCGS: 'DIVCGS'>_[#](#alpaca.trading.enums.ActivityType.DIVCGS "Permalink to this definition")

DIVNRA _\= <ActivityType.DIVNRA: 'DIVNRA'>_[#](#alpaca.trading.enums.ActivityType.DIVNRA "Permalink to this definition")

DIVROC _\= <ActivityType.DIVROC: 'DIVROC'>_[#](#alpaca.trading.enums.ActivityType.DIVROC "Permalink to this definition")

DIVTXEX _\= <ActivityType.DIVTXEX: 'DIVTXEX'>_[#](#alpaca.trading.enums.ActivityType.DIVTXEX "Permalink to this definition")

DIVWH _\= <ActivityType.DIVWH: 'DIVWH'>_[#](#alpaca.trading.enums.ActivityType.DIVWH "Permalink to this definition")

EXTRD _\= <ActivityType.EXTRD: 'EXTRD'>_[#](#alpaca.trading.enums.ActivityType.EXTRD "Permalink to this definition")

FEE _\= <ActivityType.FEE: 'FEE'>_[#](#alpaca.trading.enums.ActivityType.FEE "Permalink to this definition")

FXTRD _\= <ActivityType.FXTRD: 'FXTRD'>_[#](#alpaca.trading.enums.ActivityType.FXTRD "Permalink to this definition")

INT _\= <ActivityType.INT: 'INT'>_[#](#alpaca.trading.enums.ActivityType.INT "Permalink to this definition")

INTPNL _\= <ActivityType.INTPNL: 'INTPNL'>_[#](#alpaca.trading.enums.ActivityType.INTPNL "Permalink to this definition")

JNLC _\= <ActivityType.JNLC: 'JNLC'>_[#](#alpaca.trading.enums.ActivityType.JNLC "Permalink to this definition")

JNLS _\= <ActivityType.JNLS: 'JNLS'>_[#](#alpaca.trading.enums.ActivityType.JNLS "Permalink to this definition")

MA _\= <ActivityType.MA: 'MA'>_[#](#alpaca.trading.enums.ActivityType.MA "Permalink to this definition")

MEM _\= <ActivityType.MEM: 'MEM'>_[#](#alpaca.trading.enums.ActivityType.MEM "Permalink to this definition")

NC _\= <ActivityType.NC: 'NC'>_[#](#alpaca.trading.enums.ActivityType.NC "Permalink to this definition")

OCT _\= <ActivityType.OCT: 'OCT'>_[#](#alpaca.trading.enums.ActivityType.OCT "Permalink to this definition")

OPASN _\= <ActivityType.OPASN: 'OPASN'>_[#](#alpaca.trading.enums.ActivityType.OPASN "Permalink to this definition")

OPCSH _\= <ActivityType.OPCSH: 'OPCSH'>_[#](#alpaca.trading.enums.ActivityType.OPCSH "Permalink to this definition")

OPEXC _\= <ActivityType.OPEXC: 'OPEXC'>_[#](#alpaca.trading.enums.ActivityType.OPEXC "Permalink to this definition")

OPEXP _\= <ActivityType.OPEXP: 'OPEXP'>_[#](#alpaca.trading.enums.ActivityType.OPEXP "Permalink to this definition")

OPTRD _\= <ActivityType.OPTRD: 'OPTRD'>_[#](#alpaca.trading.enums.ActivityType.OPTRD "Permalink to this definition")

PTC _\= <ActivityType.PTC: 'PTC'>_[#](#alpaca.trading.enums.ActivityType.PTC "Permalink to this definition")

REORG _\= <ActivityType.REORG: 'REORG'>_[#](#alpaca.trading.enums.ActivityType.REORG "Permalink to this definition")

SPIN _\= <ActivityType.SPIN: 'SPIN'>_[#](#alpaca.trading.enums.ActivityType.SPIN "Permalink to this definition")

SPLIT _\= <ActivityType.SPLIT: 'SPLIT'>_[#](#alpaca.trading.enums.ActivityType.SPLIT "Permalink to this definition")

SWP _\= <ActivityType.SWP: 'SWP'>_[#](#alpaca.trading.enums.ActivityType.SWP "Permalink to this definition")

VOF _\= <ActivityType.VOF: 'VOF'>_[#](#alpaca.trading.enums.ActivityType.VOF "Permalink to this definition")

WH _\= <ActivityType.WH: 'WH'>_[#](#alpaca.trading.enums.ActivityType.WH "Permalink to this definition")

TradeActivityType[#](#tradeactivitytype "Permalink to this heading")
--------------------------------------------------------------------

_enum_ alpaca.trading.enums.TradeActivityType(_value_)[#](#alpaca.trading.enums.TradeActivityType "Permalink to this definition")

Represents the type of TradeActivity.

Please see [https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#attributes](https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#attributes)

Member Type:

`str`

Valid values are as follows:

PARTIAL\_FILL _\= <TradeActivityType.PARTIAL\_FILL: 'partial\_fill'>_[#](#alpaca.trading.enums.TradeActivityType.PARTIAL_FILL "Permalink to this definition")

FILL _\= <TradeActivityType.FILL: 'fill'>_[#](#alpaca.trading.enums.TradeActivityType.FILL "Permalink to this definition")

NonTradeActivityStatus[#](#nontradeactivitystatus "Permalink to this heading")
------------------------------------------------------------------------------

_enum_ alpaca.trading.enums.NonTradeActivityStatus(_value_)[#](#alpaca.trading.enums.NonTradeActivityStatus "Permalink to this definition")

Represents the status of a NonTradeActivity.

Please see [https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#enumaccountactivity](https://alpaca.markets/docs/api-references/broker-api/accounts/account-activities/#enumaccountactivity) for more info.

Member Type:

`str`

Valid values are as follows:

EXECUTED _\= <NonTradeActivityStatus.EXECUTED: 'executed'>_[#](#alpaca.trading.enums.NonTradeActivityStatus.EXECUTED "Permalink to this definition")

CORRECT _\= <NonTradeActivityStatus.CORRECT: 'correct'>_[#](#alpaca.trading.enums.NonTradeActivityStatus.CORRECT "Permalink to this definition")

CANCELED _\= <NonTradeActivityStatus.CANCELED: 'canceled'>_[#](#alpaca.trading.enums.NonTradeActivityStatus.CANCELED "Permalink to this definition")

CorporateActionType[#](#corporateactiontype "Permalink to this heading")
------------------------------------------------------------------------

_enum_ alpaca.trading.enums.CorporateActionType(_value_)[#](#alpaca.trading.enums.CorporateActionType "Permalink to this definition")

The general types of corporate action events.

Learn more here: [https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/](https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/)

Member Type:

`str`

Valid values are as follows:

DIVIDEND _\= <CorporateActionType.DIVIDEND: 'dividend'>_[#](#alpaca.trading.enums.CorporateActionType.DIVIDEND "Permalink to this definition")

MERGER _\= <CorporateActionType.MERGER: 'merger'>_[#](#alpaca.trading.enums.CorporateActionType.MERGER "Permalink to this definition")

SPINOFF _\= <CorporateActionType.SPINOFF: 'spinoff'>_[#](#alpaca.trading.enums.CorporateActionType.SPINOFF "Permalink to this definition")

SPLIT _\= <CorporateActionType.SPLIT: 'split'>_[#](#alpaca.trading.enums.CorporateActionType.SPLIT "Permalink to this definition")

CorporateActionSubType[#](#corporateactionsubtype "Permalink to this heading")
------------------------------------------------------------------------------

_enum_ alpaca.trading.enums.CorporateActionSubType(_value_)[#](#alpaca.trading.enums.CorporateActionSubType "Permalink to this definition")

The specific types of corporate actions. Each subtype is related to CorporateActionType.

Learn more here: [https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/](https://alpaca.markets/docs/api-references/trading-api/corporate-actions-announcements/)

Member Type:

`str`

Valid values are as follows:

CASH _\= <CorporateActionSubType.CASH: 'cash'>_[#](#alpaca.trading.enums.CorporateActionSubType.CASH "Permalink to this definition")

STOCK _\= <CorporateActionSubType.STOCK: 'stock'>_[#](#alpaca.trading.enums.CorporateActionSubType.STOCK "Permalink to this definition")

MERGER\_UPDATE _\= <CorporateActionSubType.MERGER\_UPDATE: 'merger\_update'>_[#](#alpaca.trading.enums.CorporateActionSubType.MERGER_UPDATE "Permalink to this definition")

MERGER\_COMPLETION _\= <CorporateActionSubType.MERGER\_COMPLETION: 'merger\_completion'>_[#](#alpaca.trading.enums.CorporateActionSubType.MERGER_COMPLETION "Permalink to this definition")

SPINOFF _\= <CorporateActionSubType.SPINOFF: 'spinoff'>_[#](#alpaca.trading.enums.CorporateActionSubType.SPINOFF "Permalink to this definition")

STOCK\_SPLIT _\= <CorporateActionSubType.STOCK\_SPLIT: 'stock\_split'>_[#](#alpaca.trading.enums.CorporateActionSubType.STOCK_SPLIT "Permalink to this definition")

UNIT\_SPLIT _\= <CorporateActionSubType.UNIT\_SPLIT: 'unit\_split'>_[#](#alpaca.trading.enums.CorporateActionSubType.UNIT_SPLIT "Permalink to this definition")

REVERSE\_SPLIT _\= <CorporateActionSubType.REVERSE\_SPLIT: 'reverse\_split'>_[#](#alpaca.trading.enums.CorporateActionSubType.REVERSE_SPLIT "Permalink to this definition")

RECAPITALIZATION _\= <CorporateActionSubType.RECAPITALIZATION: 'recapitalization'>_[#](#alpaca.trading.enums.CorporateActionSubType.RECAPITALIZATION "Permalink to this definition")

CorporateActionDateType[#](#corporateactiondatetype "Permalink to this heading")
--------------------------------------------------------------------------------

_enum_ alpaca.trading.enums.CorporateActionDateType(_value_)[#](#alpaca.trading.enums.CorporateActionDateType "Permalink to this definition")

Member Type:

`str`

Valid values are as follows:

DECLARATION\_DATE _\= <CorporateActionDateType.DECLARATION\_DATE: 'declaration\_date'>_[#](#alpaca.trading.enums.CorporateActionDateType.DECLARATION_DATE "Permalink to this definition")

EX\_DATE _\= <CorporateActionDateType.EX\_DATE: 'ex\_date'>_[#](#alpaca.trading.enums.CorporateActionDateType.EX_DATE "Permalink to this definition")

RECORD\_DATE _\= <CorporateActionDateType.RECORD\_DATE: 'record\_date'>_[#](#alpaca.trading.enums.CorporateActionDateType.RECORD_DATE "Permalink to this definition")

PAYABLE\_DATE _\= <CorporateActionDateType.PAYABLE\_DATE: 'payable\_date'>_[#](#alpaca.trading.enums.CorporateActionDateType.PAYABLE_DATE "Permalink to this definition")

DTBPCheck[#](#dtbpcheck "Permalink to this heading")
----------------------------------------------------

_enum_ alpaca.trading.enums.DTBPCheck(_value_)[#](#alpaca.trading.enums.DTBPCheck "Permalink to this definition")

Specifies when to run a DTBP check for an account.

NOTE: These values are currently the same as PDTCheck however they are not guaranteed to be in sync the future

please see [https://alpaca.markets/docs/api-references/broker-api/trading/trading-configurations/#attributes](https://alpaca.markets/docs/api-references/broker-api/trading/trading-configurations/#attributes) for more info.

Member Type:

`str`

Valid values are as follows:

BOTH _\= <DTBPCheck.BOTH: 'both'>_[#](#alpaca.trading.enums.DTBPCheck.BOTH "Permalink to this definition")

ENTRY _\= <DTBPCheck.ENTRY: 'entry'>_[#](#alpaca.trading.enums.DTBPCheck.ENTRY "Permalink to this definition")

EXIT _\= <DTBPCheck.EXIT: 'exit'>_[#](#alpaca.trading.enums.DTBPCheck.EXIT "Permalink to this definition")

PDTCheck[#](#pdtcheck "Permalink to this heading")
--------------------------------------------------

_enum_ alpaca.trading.enums.PDTCheck(_value_)[#](#alpaca.trading.enums.PDTCheck "Permalink to this definition")

Specifies when to run a PDT check for an account.

NOTE: These values are currently the same as DTBPCheck however they are not guaranteed to be in sync the future

please see [https://alpaca.markets/docs/api-references/broker-api/trading/trading-configurations/#attributes](https://alpaca.markets/docs/api-references/broker-api/trading/trading-configurations/#attributes) for more info.

Member Type:

`str`

Valid values are as follows:

BOTH _\= <PDTCheck.BOTH: 'both'>_[#](#alpaca.trading.enums.PDTCheck.BOTH "Permalink to this definition")

ENTRY _\= <PDTCheck.ENTRY: 'entry'>_[#](#alpaca.trading.enums.PDTCheck.ENTRY "Permalink to this definition")

EXIT _\= <PDTCheck.EXIT: 'exit'>_[#](#alpaca.trading.enums.PDTCheck.EXIT "Permalink to this definition")

TradeConfirmationEmail[#](#tradeconfirmationemail "Permalink to this heading")
------------------------------------------------------------------------------

_enum_ alpaca.trading.enums.TradeConfirmationEmail(_value_)[#](#alpaca.trading.enums.TradeConfirmationEmail "Permalink to this definition")

Used for controlling when an Account will receive a trade confirmation email.

please see [https://docs.alpaca.markets/reference/getaccountconfig](https://docs.alpaca.markets/reference/getaccountconfig) for more info.

Member Type:

`str`

Valid values are as follows:

ALL _\= <TradeConfirmationEmail.ALL: 'all'>_[#](#alpaca.trading.enums.TradeConfirmationEmail.ALL "Permalink to this definition")

NONE _\= <TradeConfirmationEmail.NONE: 'none'>_[#](#alpaca.trading.enums.TradeConfirmationEmail.NONE "Permalink to this definition")

PositionIntent[#](#positionintent "Permalink to this heading")
--------------------------------------------------------------

_enum_ alpaca.trading.enums.PositionIntent(_value_)[#](#alpaca.trading.enums.PositionIntent "Permalink to this definition")

Represents what side this order was executed on.

Member Type:

`str`

Valid values are as follows:

BUY\_TO\_OPEN _\= <PositionIntent.BUY\_TO\_OPEN: 'buy\_to\_open'>_[#](#alpaca.trading.enums.PositionIntent.BUY_TO_OPEN "Permalink to this definition")

BUY\_TO\_CLOSE _\= <PositionIntent.BUY\_TO\_CLOSE: 'buy\_to\_close'>_[#](#alpaca.trading.enums.PositionIntent.BUY_TO_CLOSE "Permalink to this definition")

SELL\_TO\_OPEN _\= <PositionIntent.SELL\_TO\_OPEN: 'sell\_to\_open'>_[#](#alpaca.trading.enums.PositionIntent.SELL_TO_OPEN "Permalink to this definition")

SELL\_TO\_CLOSE _\= <PositionIntent.SELL\_TO\_CLOSE: 'sell\_to\_close'>_[#](#alpaca.trading.enums.PositionIntent.SELL_TO_CLOSE "Permalink to this definition")</content>
</page>

<page>
  <title>Requests - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/trading/requests.html</url>
  <content>OrderRequest[#](#orderrequest "Permalink to this heading")
----------------------------------------------------------

_class_ alpaca.trading.requests.OrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_)[#](#alpaca.trading.requests.OrderRequest "Permalink to this definition")

A base class for requests for creating an order. You probably shouldn’t directly use this class when submitting an order. Instead, use one of the order type specific classes.

symbol[#](#alpaca.trading.requests.OrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded. Required for all order classes other than mleg.

Type:

str

qty[#](#alpaca.trading.requests.OrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders. Required for mleg order class.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.OrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.OrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset. Either side or position\_intent is required for all order classes other than mleg.

Type:

Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\]

type[#](#alpaca.trading.requests.OrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.OrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.OrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.OrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.OrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.OrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order If specified (must contain at least 2 but no more than 4 legs for options). Otherwise, for equities, a list of individual orders.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.OrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.OrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

position\_intent[#](#alpaca.trading.requests.OrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

MarketOrderRequest[#](#marketorderrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.trading.requests.MarketOrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_)[#](#alpaca.trading.requests.MarketOrderRequest "Permalink to this definition")

Used to submit a market order.

symbol[#](#alpaca.trading.requests.MarketOrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded. Required for all order classes other than mleg.

Type:

str

qty[#](#alpaca.trading.requests.MarketOrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.MarketOrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.MarketOrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset. Required for all order classes other than mleg.

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

type[#](#alpaca.trading.requests.MarketOrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.MarketOrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.MarketOrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.MarketOrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.MarketOrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.MarketOrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order. At most 4 legs are allowed for options.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.MarketOrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.MarketOrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

position\_intent[#](#alpaca.trading.requests.MarketOrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

StopOrderRequest[#](#stoporderrequest "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.trading.requests.StopOrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_, _stop\_price: float_)[#](#alpaca.trading.requests.StopOrderRequest "Permalink to this definition")

Used to submit a stop order.

symbol[#](#alpaca.trading.requests.StopOrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded

Type:

str

qty[#](#alpaca.trading.requests.StopOrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.StopOrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.StopOrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset.

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

type[#](#alpaca.trading.requests.StopOrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.StopOrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.StopOrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.StopOrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.StopOrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.StopOrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order. At most 4 legs are allowed for options.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.StopOrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.StopOrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

stop\_price[#](#alpaca.trading.requests.StopOrderRequest.stop_price "Permalink to this definition")

The price at which the stop order is converted to a market order or a stop limit order is converted to a limit order.

Type:

float

position\_intent[#](#alpaca.trading.requests.StopOrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

LimitOrderRequest[#](#limitorderrequest "Permalink to this heading")
--------------------------------------------------------------------

_class_ alpaca.trading.requests.LimitOrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_, _limit\_price: Optional\[float\] \= None_)[#](#alpaca.trading.requests.LimitOrderRequest "Permalink to this definition")

Used to submit a limit order.

symbol[#](#alpaca.trading.requests.LimitOrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded

Type:

str

qty[#](#alpaca.trading.requests.LimitOrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.LimitOrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.LimitOrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset.

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

type[#](#alpaca.trading.requests.LimitOrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.LimitOrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.LimitOrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.LimitOrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.LimitOrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.LimitOrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order. At most 4 legs are allowed for options.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.LimitOrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.LimitOrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

limit\_price[#](#alpaca.trading.requests.LimitOrderRequest.limit_price "Permalink to this definition")

The worst fill price for a limit or stop limit order. For the mleg order class, this is specified such that a positive value indicates a debit (representing a cost or payment to be made) while a negative value signifies a credit (reflecting an amount to be received).

Type:

Optional\[float\]

position\_intent[#](#alpaca.trading.requests.LimitOrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

StopLimitOrderRequest[#](#stoplimitorderrequest "Permalink to this heading")
----------------------------------------------------------------------------

_class_ alpaca.trading.requests.StopLimitOrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_, _stop\_price: float_, _limit\_price: float_)[#](#alpaca.trading.requests.StopLimitOrderRequest "Permalink to this definition")

Used to submit a stop limit order.

symbol[#](#alpaca.trading.requests.StopLimitOrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded

Type:

str

qty[#](#alpaca.trading.requests.StopLimitOrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.StopLimitOrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.StopLimitOrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset.

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

type[#](#alpaca.trading.requests.StopLimitOrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.StopLimitOrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.StopLimitOrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.StopLimitOrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.StopLimitOrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.StopLimitOrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order. At most 4 legs are allowed for options.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.StopLimitOrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.StopLimitOrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

stop\_price[#](#alpaca.trading.requests.StopLimitOrderRequest.stop_price "Permalink to this definition")

The price at which the stop order is converted to a market order or a stop limit order is converted to a limit order.

Type:

float

limit\_price[#](#alpaca.trading.requests.StopLimitOrderRequest.limit_price "Permalink to this definition")

The worst fill price for a limit or stop limit order. For the mleg order class, this is specified such that a positive value indicates a debit (representing a cost or payment to be made) while a negative value signifies a credit (reflecting an amount to be received).

Type:

float

position\_intent[#](#alpaca.trading.requests.StopLimitOrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

TrailingStopOrderRequest[#](#trailingstoporderrequest "Permalink to this heading")
----------------------------------------------------------------------------------

_class_ alpaca.trading.requests.TrailingStopOrderRequest(_\*_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _notional: Optional\[float\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _type: [OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")_, _time\_in\_force: [TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")_, _order\_class: Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _client\_order\_id: Optional\[str\] \= None_, _legs: Optional\[List\[OptionLegRequest\]\] \= None_, _take\_profit: Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\] \= None_, _stop\_loss: Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\] \= None_, _position\_intent: Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\] \= None_, _trail\_price: Optional\[float\] \= None_, _trail\_percent: Optional\[float\] \= None_)[#](#alpaca.trading.requests.TrailingStopOrderRequest "Permalink to this definition")

Used to submit a trailing stop order.

symbol[#](#alpaca.trading.requests.TrailingStopOrderRequest.symbol "Permalink to this definition")

The symbol identifier for the asset being traded

Type:

str

qty[#](#alpaca.trading.requests.TrailingStopOrderRequest.qty "Permalink to this definition")

The number of shares to trade. Fractional qty for stocks only with market orders.

Type:

Optional\[float\]

notional[#](#alpaca.trading.requests.TrailingStopOrderRequest.notional "Permalink to this definition")

The base currency value of the shares to trade. For stocks, only works with MarketOrders. **Does not work with qty**.

Type:

Optional\[float\]

side[#](#alpaca.trading.requests.TrailingStopOrderRequest.side "Permalink to this definition")

Whether the order will buy or sell the asset.

Type:

[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")

type[#](#alpaca.trading.requests.TrailingStopOrderRequest.type "Permalink to this definition")

The execution logic type of the order (market, limit, etc).

Type:

[OrderType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderType "alpaca.trading.enums.OrderType")

time\_in\_force[#](#alpaca.trading.requests.TrailingStopOrderRequest.time_in_force "Permalink to this definition")

The expiration logic of the order.

Type:

[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")

extended\_hours[#](#alpaca.trading.requests.TrailingStopOrderRequest.extended_hours "Permalink to this definition")

Whether the order can be executed during regular market hours.

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.TrailingStopOrderRequest.client_order_id "Permalink to this definition")

A string to identify which client submitted the order.

Type:

Optional\[str\]

order\_class[#](#alpaca.trading.requests.TrailingStopOrderRequest.order_class "Permalink to this definition")

The class of the order. Simple orders have no other legs.

Type:

Optional\[[OrderClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderClass "alpaca.trading.enums.OrderClass")\]

legs[#](#alpaca.trading.requests.TrailingStopOrderRequest.legs "Permalink to this definition")

For multi-leg option orders, the legs of the order. At most 4 legs are allowed for options.

Type:

Optional\[List\[OptionLegRequest\]\]

take\_profit[#](#alpaca.trading.requests.TrailingStopOrderRequest.take_profit "Permalink to this definition")

For orders with multiple legs, an order to exit a profitable trade.

Type:

Optional\[[TakeProfitRequest](#alpaca.trading.requests.TakeProfitRequest "alpaca.trading.requests.TakeProfitRequest")\]

stop\_loss[#](#alpaca.trading.requests.TrailingStopOrderRequest.stop_loss "Permalink to this definition")

For orders with multiple legs, an order to exit a losing trade.

Type:

Optional\[[StopLossRequest](#alpaca.trading.requests.StopLossRequest "alpaca.trading.requests.StopLossRequest")\]

trail\_price[#](#alpaca.trading.requests.TrailingStopOrderRequest.trail_price "Permalink to this definition")

The absolute price difference by which the trailing stop will trail.

Type:

Optional\[float\]

trail\_percent[#](#alpaca.trading.requests.TrailingStopOrderRequest.trail_percent "Permalink to this definition")

The percent price difference by which the trailing stop will trail.

Type:

Optional\[float\]

position\_intent[#](#alpaca.trading.requests.TrailingStopOrderRequest.position_intent "Permalink to this definition")

An enum to indicate the desired position strategy: BTO, BTC, STO, STC.

Type:

Optional\[[PositionIntent](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.PositionIntent "alpaca.trading.enums.PositionIntent")\]

GetOrdersRequest[#](#getordersrequest "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.trading.requests.GetOrdersRequest(_\*_, _status: Optional\[QueryOrderStatus\] \= None_, _limit: Optional\[int\] \= None_, _after: Optional\[datetime\] \= None_, _until: Optional\[datetime\] \= None_, _direction: Optional\[Sort\] \= None_, _nested: Optional\[bool\] \= None_, _side: Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\] \= None_, _symbols: Optional\[List\[str\]\] \= None_)[#](#alpaca.trading.requests.GetOrdersRequest "Permalink to this definition")

Contains data for submitting a request to retrieve orders.

status[#](#alpaca.trading.requests.GetOrdersRequest.status "Permalink to this definition")

Order status to be queried. open, closed or all. Defaults to open. Not same as OrderStatus property of Order.

Type:

Optional\[QueryOrderStatus\]

limit[#](#alpaca.trading.requests.GetOrdersRequest.limit "Permalink to this definition")

The maximum number of orders in response. Defaults to 50 and max is 500.

Type:

Optional\[int\]

after[#](#alpaca.trading.requests.GetOrdersRequest.after "Permalink to this definition")

The response will include only ones submitted after this timestamp.

Type:

Optional\[datetime\]

until[#](#alpaca.trading.requests.GetOrdersRequest.until "Permalink to this definition")

The response will include only ones submitted until this timestamp.

Type:

Optional\[datetime\]

direction[#](#alpaca.trading.requests.GetOrdersRequest.direction "Permalink to this definition")

The chronological order of response based on the submission time. asc or desc. Defaults to desc.

Type:

Optional\[Sort\]

nested[#](#alpaca.trading.requests.GetOrdersRequest.nested "Permalink to this definition")

If true, the result will roll up multi-leg orders under the legs field of primary order.

Type:

Optional\[bool\]

side[#](#alpaca.trading.requests.GetOrdersRequest.side "Permalink to this definition")

Filters down to orders that have a matching side field set.

Type:

Optional\[[OrderSide](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.OrderSide "alpaca.trading.enums.OrderSide")\]

symbols[#](#alpaca.trading.requests.GetOrdersRequest.symbols "Permalink to this definition")

List of symbols to filter by.

Type:

Optional\[List\[str\]\]

GetOrderByIdRequest[#](#getorderbyidrequest "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.trading.requests.GetOrderByIdRequest(_\*_, _nested: bool_)[#](#alpaca.trading.requests.GetOrderByIdRequest "Permalink to this definition")

Contains data for submitting a request to retrieve a single order by its order id.

nested[#](#alpaca.trading.requests.GetOrderByIdRequest.nested "Permalink to this definition")

If true, the result will roll up multi-leg orders under the legs field of primary order.

Type:

bool

ReplaceOrderRequest[#](#replaceorderrequest "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.trading.requests.ReplaceOrderRequest(_\*_, _qty: Optional\[int\] \= None_, _time\_in\_force: Optional\[[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")\] \= None_, _limit\_price: Optional\[float\] \= None_, _stop\_price: Optional\[float\] \= None_, _trail: Optional\[float\] \= None_, _client\_order\_id: Optional\[str\] \= None_)[#](#alpaca.trading.requests.ReplaceOrderRequest "Permalink to this definition")

Contains data for submitting a request to replace an order.

qty[#](#alpaca.trading.requests.ReplaceOrderRequest.qty "Permalink to this definition")

Number of shares to trade

Type:

Optional\[int\]

time\_in\_force[#](#alpaca.trading.requests.ReplaceOrderRequest.time_in_force "Permalink to this definition")

The new expiration logic of the order.

Type:

Optional\[[TimeInForce](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.TimeInForce "alpaca.trading.enums.TimeInForce")\]

limit\_price[#](#alpaca.trading.requests.ReplaceOrderRequest.limit_price "Permalink to this definition")

Required if type of order being replaced is limit or stop\_limit

Type:

Optional\[float\]

stop\_price[#](#alpaca.trading.requests.ReplaceOrderRequest.stop_price "Permalink to this definition")

Required if type of order being replaced is stop or stop\_limit

Type:

Optional\[float\]

trail[#](#alpaca.trading.requests.ReplaceOrderRequest.trail "Permalink to this definition")

The new value of the trail\_price or trail\_percent value (works only for type=“trailing\_stop”)

Type:

Optional\[float\]

client\_order\_id[#](#alpaca.trading.requests.ReplaceOrderRequest.client_order_id "Permalink to this definition")

A unique identifier for the order.

Type:

Optional\[str\]

TakeProfitRequest[#](#takeprofitrequest "Permalink to this heading")
--------------------------------------------------------------------

_class_ alpaca.trading.requests.TakeProfitRequest(_\*_, _limit\_price: float_)[#](#alpaca.trading.requests.TakeProfitRequest "Permalink to this definition")

Used for providing take profit details for a bracket order.

limit\_price[#](#alpaca.trading.requests.TakeProfitRequest.limit_price "Permalink to this definition")

The execution price for exiting a profitable trade.

Type:

float

StopLossRequest[#](#stoplossrequest "Permalink to this heading")
----------------------------------------------------------------

_class_ alpaca.trading.requests.StopLossRequest(_\*_, _stop\_price: float_, _limit\_price: Optional\[float\] \= None_)[#](#alpaca.trading.requests.StopLossRequest "Permalink to this definition")

Used for providing stop loss details for a bracket order.

stop\_price[#](#alpaca.trading.requests.StopLossRequest.stop_price "Permalink to this definition")

The price at which the stop loss is triggered.

Type:

float

limit\_price[#](#alpaca.trading.requests.StopLossRequest.limit_price "Permalink to this definition")

The execution price for exiting a losing trade. If not provided, the stop loss will execute as a market order.

Type:

Optional\[float\]

ClosePositionRequest[#](#closepositionrequest "Permalink to this heading")
--------------------------------------------------------------------------

_class_ alpaca.trading.requests.ClosePositionRequest(_\*_, _qty: Optional\[str\] \= None_, _percentage: Optional\[str\] \= None_)[#](#alpaca.trading.requests.ClosePositionRequest "Permalink to this definition")

qty[#](#alpaca.trading.requests.ClosePositionRequest.qty "Permalink to this definition")

The number of shares to liquidate.

Type:

str

percentage[#](#alpaca.trading.requests.ClosePositionRequest.percentage "Permalink to this definition")

The percentage of shares to liquidate.

Type:

str

GetAssetsRequest[#](#getassetsrequest "Permalink to this heading")
------------------------------------------------------------------

_class_ alpaca.trading.requests.GetAssetsRequest(_\*_, _status: Optional\[[AssetStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetStatus "alpaca.trading.enums.AssetStatus")\] \= None_, _asset\_class: Optional\[[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")\] \= None_, _exchange: Optional\[[AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")\] \= None_, _attributes: Optional\[str\] \= None_)[#](#alpaca.trading.requests.GetAssetsRequest "Permalink to this definition")

When querying for available assets, this model provides the parameters that can be filtered by.

status[#](#alpaca.trading.requests.GetAssetsRequest.status "Permalink to this definition")

The active status of the asset.

Type:

Optional\[[AssetStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetStatus "alpaca.trading.enums.AssetStatus")\]

asset\_class[#](#alpaca.trading.requests.GetAssetsRequest.asset_class "Permalink to this definition")

The type of asset (i.e. us\_equity, crypto).

Type:

Optional\[[AssetClass](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetClass "alpaca.trading.enums.AssetClass")\]

exchange[#](#alpaca.trading.requests.GetAssetsRequest.exchange "Permalink to this definition")

The exchange the asset trades on.

Type:

Optional\[[AssetExchange](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AssetExchange "alpaca.trading.enums.AssetExchange")\]

attributes[#](#alpaca.trading.requests.GetAssetsRequest.attributes "Permalink to this definition")

Comma separated values to query for more than one attribute.

Type:

Optional\[str\]

GetPortfolioHistoryRequest[#](#getportfoliohistoryrequest "Permalink to this heading")
--------------------------------------------------------------------------------------

_class_ alpaca.trading.requests.GetPortfolioHistoryRequest(_\*_, _period: Optional\[str\] \= None_, _timeframe: Optional\[str\] \= None_, _intraday\_reporting: Optional\[str\] \= None_, _start: Optional\[datetime\] \= None_, _pnl\_reset: Optional\[str\] \= None_, _end: Optional\[datetime\] \= None_, _date\_end: Optional\[date\] \= None_, _extended\_hours: Optional\[bool\] \= None_, _cashflow\_types: Optional\[str\] \= None_)[#](#alpaca.trading.requests.GetPortfolioHistoryRequest "Permalink to this definition")

period[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.period "Permalink to this definition")

The duration of the data in number + unit, such as 1D. unit can be D for day, W for week, M for month and A for year. Defaults to 1M.

Type:

Optional\[str\]

timeframe[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.timeframe "Permalink to this definition")

The resolution of time window. 1Min, 5Min, 15Min, 1H, or 1D. If omitted, 1Min for less than 7 days period, 15Min for less than 30 days, or otherwise 1D.

Type:

Optional\[str\]

intraday\_reporting[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.intraday_reporting "Permalink to this definition")

this specfies which timestamps to return data points

Type:

Optional\[str\]

start[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.start "Permalink to this definition")

The timestamp the data is returned starting from in RFC3339 format (including timezone specification).

Type:

Optional\[datetime\]

pnl\_reset[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.pnl_reset "Permalink to this definition")

efines how we are calculating the baseline values for Profit And Loss (pnl) for queries with timeframe less than 1D (intraday queries).

Type:

Optional\[str\]

end[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.end "Permalink to this definition")

The timestamp the data is returned up to in RFC3339 format (including timezone specification).

Type:

Optional\[datetime\]

date\_end[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.date_end "Permalink to this definition")

The date the data is returned up to. Defaults to the current market date (rolls over at the market open if extended\_hours is false, otherwise at 7am ET).

Type:

Optional\[date\]

extended\_hours[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.extended_hours "Permalink to this definition")

If true, include extended hours in the result. This is effective only for timeframe less than 1D.

Type:

Optional\[bool\]

cashflow\_types[#](#alpaca.trading.requests.GetPortfolioHistoryRequest.cashflow_types "Permalink to this definition")

The cashflow activities to include in the report

Type:

Optional\[str\]

GetCalendarRequest[#](#getcalendarrequest "Permalink to this heading")
----------------------------------------------------------------------

_class_ alpaca.trading.requests.GetCalendarRequest(_\*_, _start: Optional\[date\] \= None_, _end: Optional\[date\] \= None_)[#](#alpaca.trading.requests.GetCalendarRequest "Permalink to this definition")

Represents the optional filtering you can do when requesting a Calendar object

CreateWatchlistRequest[#](#createwatchlistrequest "Permalink to this heading")
------------------------------------------------------------------------------

_class_ alpaca.trading.requests.CreateWatchlistRequest(_\*_, _name: str_, _symbols: List\[str\]_)[#](#alpaca.trading.requests.CreateWatchlistRequest "Permalink to this definition")

Represents the fields you can specify when creating a Watchlist

name[#](#alpaca.trading.requests.CreateWatchlistRequest.name "Permalink to this definition")

Name of the Watchlist

Type:

str

symbols[#](#alpaca.trading.requests.CreateWatchlistRequest.symbols "Permalink to this definition")

Symbols of Assets to watch

Type:

List\[str\]

UpdateWatchlistRequest[#](#updatewatchlistrequest "Permalink to this heading")
------------------------------------------------------------------------------

_class_ alpaca.trading.requests.UpdateWatchlistRequest(_\*_, _name: Optional\[str\] \= None_, _symbols: Optional\[List\[str\]\] \= None_)[#](#alpaca.trading.requests.UpdateWatchlistRequest "Permalink to this definition")

Represents the fields you can specify when updating a Watchlist

name[#](#alpaca.trading.requests.UpdateWatchlistRequest.name "Permalink to this definition")

Name of the Watchlist

Type:

Optional\[str\]

symbols[#](#alpaca.trading.requests.UpdateWatchlistRequest.symbols "Permalink to this definition")

Symbols of Assets to watch

Type:

Optional\[List\[str\]\]

CancelOrderResponse[#](#cancelorderresponse "Permalink to this heading")
------------------------------------------------------------------------

_class_ alpaca.trading.requests.CancelOrderResponse(_\*_, _id: UUID_, _status: int_, _body: Optional\[Dict\[str, Any\]\] \= None_)[#](#alpaca.trading.requests.CancelOrderResponse "Permalink to this definition")

Data returned after requesting to cancel an order. It contains the cancel status of an order.

id[#](#alpaca.trading.requests.CancelOrderResponse.id "Permalink to this definition")

The order id

Type:

UUID

status[#](#alpaca.trading.requests.CancelOrderResponse.status "Permalink to this definition")

The HTTP status returned after attempting to cancel the order.

Type:

int

body[#](#alpaca.trading.requests.CancelOrderResponse.body "Permalink to this definition")

an error description

Type:

Dict\[str, Any\]

GetCorporateAnnouncementsRequest[#](#getcorporateannouncementsrequest "Permalink to this heading")
--------------------------------------------------------------------------------------------------

_class_ alpaca.trading.requests.GetCorporateAnnouncementsRequest(_\*_, _ca\_types: List\[[CorporateActionType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionType "alpaca.trading.enums.CorporateActionType")\]_, _since: date_, _until: date_, _symbol: Optional\[str\] \= None_, _cusip: Optional\[str\] \= None_, _date\_type: Optional\[[CorporateActionDateType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionDateType "alpaca.trading.enums.CorporateActionDateType")\] \= None_)[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest "Permalink to this definition")

Contains parameters for querying corporate action data. .. attribute:: ca\_types

> A list of corporate action types.
> 
> type:
> 
> List\[CorporateActionType\]

since[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest.since "Permalink to this definition")

The start (inclusive) of the date range when searching corporate action announcements. The date range is limited to 90 days.

Type:

date

until[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest.until "Permalink to this definition")

The end (inclusive) of the date range when searching corporate action announcements. The date range is limited to 90 days.

Type:

date

symbol[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest.symbol "Permalink to this definition")

The symbol of the company initiating the announcement.

Type:

Optional\[str\]

cusip[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest.cusip "Permalink to this definition")

The CUSIP of the company initiating the announcement.

Type:

Optional\[str\]

date\_type[#](#alpaca.trading.requests.GetCorporateAnnouncementsRequest.date_type "Permalink to this definition")

The date type for the announcement.

Type:

Optional\[[CorporateActionDateType](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.CorporateActionDateType "alpaca.trading.enums.CorporateActionDateType")\]</content>
</page>

<page>
  <title>Broker Reference - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker_api.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>BrokerClient - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/broker-client.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

_class_ alpaca.broker.client.BrokerClient(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _api\_version: str \= 'v1'_, _sandbox: bool \= True_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.broker.client.BrokerClient "Permalink to this definition")

Client for accessing Broker API services

**Note on the \`handle\_pagination\` param you’ll see across these methods**

By default, these methods will attempt to handle the fact that the API paginates results for the specific endpoint for you by returning it all as one List.

However, that could:

1\. Take a long time if there are many results to paginate or if you request a small page size and have moderate network latency 2. Use up a large amount of memory to build all the results at once

So for those cases where a single list all at once would be prohibitive you can specify what kind of pagination you want with the handle\_pagination parameter. Please see the PaginationType enum for an explanation as to what the different values mean for what you get back.

\_\_init\_\_(_api\_key: Optional\[str\] \= None_, _secret\_key: Optional\[str\] \= None_, _api\_version: str \= 'v1'_, _sandbox: bool \= True_, _raw\_data: bool \= False_, _url\_override: Optional\[str\] \= None_)[#](#alpaca.broker.client.BrokerClient.__init__ "Permalink to this definition")

Parameters:

*   **api\_key** (_Optional__\[__str__\]_) – Broker API key - set sandbox to true if using sandbox keys. Defaults to None.
    
*   **secret\_key** (_Optional__\[__str__\]_) – Broker API secret key - set sandbox to true if using sandbox keys. Defaults to None.
    
*   **api\_version** (_str_) – API version. Defaults to ‘v1’.
    
*   **sandbox** (_bool_) – True if using sandbox mode. Defaults to True.
    
*   **raw\_data** (_bool_) – True if you want raw response instead of wrapped responses. Defaults to False. This has not been implemented yet.
    
*   **url\_override** (_Optional__\[__str__\]_) – A url to override and use as the base url.</content>
</page>

<page>
  <title>Assets - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/assets.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

With the asset methods, you can query the list of assets that are available for trading and data consumption through Alpaca.

Get All Assets[#](#get-all-assets "Permalink to this heading")
--------------------------------------------------------------

BrokerClient.get\_all\_assets(_filter: Optional\[[GetAssetsRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetAssetsRequest "alpaca.trading.requests.GetAssetsRequest")\] \= None_) → Union\[List\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_all_assets "Permalink to this definition")

The assets API serves as the master list of assets available for trade and data consumption from Alpaca. Some assets are not tradable with Alpaca. These assets will be marked with the flag tradable=false.

Parameters:

**filter** (_Optional__\[_[_GetAssetsRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetAssetsRequest "alpaca.trading.requests.GetAssetsRequest")_\]_) – The parameters that can be assets can be queried by.

Returns:

The list of assets.

Return type:

List\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")\]

Get a Single Asset[#](#get-a-single-asset "Permalink to this heading")
----------------------------------------------------------------------

BrokerClient.get\_asset(_symbol\_or\_asset\_id: Union\[UUID, str\]_) → Union\[[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_asset "Permalink to this definition")

Returns a specific asset by its symbol or asset id. If the specified asset does not exist a 404 error will be thrown.

Parameters:

**symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol or asset id for the specified asset

Returns:

The asset if it exists.

Return type:

[Asset](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Asset "alpaca.trading.models.Asset")</content>
</page>

<page>
  <title>Accounts - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/accounts.html</url>
  <content>Toggle table of contents sidebar

The accounts API allows you to create brokerage accounts on behalf of your users. It also lets you manage accounts under your custody.

Create an Account[#](#create-an-account "Permalink to this heading")
--------------------------------------------------------------------

BrokerClient.create\_account(_account\_data: [CreateAccountRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateAccountRequest "alpaca.broker.requests.CreateAccountRequest")_) → Union\[[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_account "Permalink to this definition")

Create an account.

Parameters:

**account\_data** ([_CreateAccountRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateAccountRequest "alpaca.broker.requests.CreateAccountRequest")) – The data representing the Account you wish to create

Returns:

The newly created Account instance as returned from the API. Should now have id and other generated fields filled out.

Return type:

[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account")

Get Account By ID[#](#get-account-by-id "Permalink to this heading")
--------------------------------------------------------------------

BrokerClient.get\_account\_by\_id(_account\_id: Union\[UUID, str\]_) → Union\[[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_account_by_id "Permalink to this definition")

Get an Account by its associated account\_id.

Note: If no account is found the api returns a 401, not a 404

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the account you wish to get. str uuid values will be upcast
    
*   **instances** (_into UUID_) –
    

Returns:

Returns the requested account.

Return type:

[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account")

Update Account[#](#update-account "Permalink to this heading")
--------------------------------------------------------------

BrokerClient.update\_account(_account\_id: Union\[UUID, str\]_, _update\_data: [UpdateAccountRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.UpdateAccountRequest "alpaca.broker.requests.UpdateAccountRequest")_) → Union\[[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.update_account "Permalink to this definition")

Updates data for an account with an id of account\_id. Note that not all data for an account is modifiable after creation so there is a special data type of AccountUpdateRequest representing the data that is allowed to be modified.

see: [https://alpaca.markets/docs/api-references/broker-api/accounts/accounts/#updating-an-account](https://alpaca.markets/docs/api-references/broker-api/accounts/accounts/#updating-an-account) for more info

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id for the account you with to update. str uuid values will be upcast
    
*   **instances** (_into UUID_) –
    
*   **update\_data** ([_UpdateAccountRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.UpdateAccountRequest "alpaca.broker.requests.UpdateAccountRequest")) – The data you wish to update this account to
    

Returns:

Returns an Account instance with the updated data as returned from the api

Return type:

[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account")

Upload Documents to Account[#](#upload-documents-to-account "Permalink to this heading")
----------------------------------------------------------------------------------------

BrokerClient.upload\_documents\_to\_account(_account\_id: Union\[UUID, str\]_, _document\_data: List\[Union\[[UploadDocumentRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.UploadDocumentRequest "alpaca.broker.requests.UploadDocumentRequest"), [UploadW8BenDocumentRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.UploadW8BenDocumentRequest "alpaca.broker.requests.UploadW8BenDocumentRequest")\]\]_) → None[#](#alpaca.broker.client.BrokerClient.upload_documents_to_account "Permalink to this definition")

Allows you to upload up to 10 documents at a time for an Account.

Document data must be a binary objects whose contents are encoded in base64. Each encoded content size is limited to 10MB if you use Alpaca for KYCaaS.

If you perform your own KYC there are no document size limitations.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the Account you wish to upload the document data to.
    
*   **document\_data** (_List__\[_[_UploadDocumentRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.UploadDocumentRequest "alpaca.broker.requests.UploadDocumentRequest")_\]_) – List of UploadDocumentRequest’s that contain the relevant Document data
    

Returns:

This function returns nothing on success and will raise an APIError in case of a failure

Return type:

None

Raises:

[**APIError**](https://alpaca.markets/sdks/python/api_reference/common/exceptions.html#alpaca.common.exceptions.APIError "alpaca.common.exceptions.APIError") – this will be raised if the API didn’t return a 204 for your request.

Delete Account[#](#delete-account "Permalink to this heading")
--------------------------------------------------------------

BrokerClient.delete\_account(_account\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.delete_account "Permalink to this definition")

DEPRECATED:

delete\_account is deprecated and will be removed in a future version. Please use close\_account(account\_id) instead

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the account to be closed

Return type:

None

List All Accounts[#](#list-all-accounts "Permalink to this heading")
--------------------------------------------------------------------

BrokerClient.list\_accounts(_search\_parameters: Optional\[[ListAccountsRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.ListAccountsRequest "alpaca.broker.requests.ListAccountsRequest")\] \= None_) → Union\[List\[[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.list_accounts "Permalink to this definition")

Get a List of Accounts allowing for passing in some filters.

Parameters:

**search\_parameters** (_Optional__\[_[_ListAccountsRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.ListAccountsRequest "alpaca.broker.requests.ListAccountsRequest")_\]_) – The various filtering criteria you can specify.

Returns:

The filtered list of Accounts

Return type:

List\[[Account](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.Account "alpaca.broker.models.accounts.Account")\]

Get Trade Account By ID[#](#get-trade-account-by-id "Permalink to this heading")
--------------------------------------------------------------------------------

BrokerClient.get\_trade\_account\_by\_id(_account\_id: Union\[UUID, str\]_) → Union\[[TradeAccount](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.TradeAccount "alpaca.broker.models.accounts.TradeAccount"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_trade_account_by_id "Permalink to this definition")

Gets TradeAccount information for a given Account id.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The UUID identifier for the Account you wish to get the info for. str values will be upcast into UUID instances and checked for validity.

Returns:

TradeAccount info for the given account if found.

Return type:

[alpaca.broker.models.accounts.TradeAccount](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.accounts.TradeAccount "alpaca.broker.models.accounts.TradeAccount")

Get Trade Configuration For Account[#](#get-trade-configuration-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------------------------

BrokerClient.get\_trade\_configuration\_for\_account(_account\_id: Union\[UUID, str\]_) → Union\[[AccountConfiguration](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.AccountConfiguration "alpaca.trading.models.AccountConfiguration"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_trade_configuration_for_account "Permalink to this definition")

Gets the TradeAccountConfiguration for a given Account.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the Account you wish to get the TradeAccountConfiguration for

Returns:

The resulting TradeAccountConfiguration for the Account

Return type:

TradeAccountConfiguration

Update Trade Configuration For Account[#](#update-trade-configuration-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------------------------------

BrokerClient.update\_trade\_configuration\_for\_account(_account\_id: Union\[UUID, str\]_, _config: [AccountConfiguration](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.AccountConfiguration "alpaca.trading.models.AccountConfiguration")_) → Union\[[AccountConfiguration](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.AccountConfiguration "alpaca.trading.models.AccountConfiguration"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.update_trade_configuration_for_account "Permalink to this definition")

Updates an Account with new TradeAccountConfiguration information.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the Account you wish to update.
    
*   **config** (_UpdateTradeConfigurationRequest_) – The Updated Options you wish to set on the Account
    

Returns:

The resulting TradeAccountConfiguration with updates.

Return type:

TradeAccountConfiguration</content>
</page>

<page>
  <title>Account Activities - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/account_activities.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Get Account Activities[#](#get-account-activities "Permalink to this heading")
------------------------------------------------------------------------------

BrokerClient.get\_account\_activities(_activity\_filter: [GetAccountActivitiesRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetAccountActivitiesRequest "alpaca.broker.requests.GetAccountActivitiesRequest")_, _max\_items\_limit: Optional\[int\] \= None_, _handle\_pagination: Optional\[PaginationType\] \= None_) → Union\[List\[BaseActivity\], Iterator\[List\[BaseActivity\]\]\][#](#alpaca.broker.client.BrokerClient.get_account_activities "Permalink to this definition")

Gets a list of Account activities, with various filtering options. Please see the documentation for GetAccountActivitiesRequest for more information as to what filters are available.

The return type of this function is List\[BaseActivity\] however the list will contain concrete instances of one of the child classes of BaseActivity, either TradeActivity or NonTradeActivity. It can be a mixed list depending on what filtering criteria you pass through activity\_filter

Parameters:

*   **activity\_filter** ([_GetAccountActivitiesRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetAccountActivitiesRequest "alpaca.broker.requests.GetAccountActivitiesRequest")) – The various filtering fields you can specify to restrict results
    
*   **max\_items\_limit** (_Optional__\[__int__\]_) – A maximum number of items to return over all for when handle\_pagination is of type PaginationType.FULL. Ignored otherwise.
    
*   **handle\_pagination** (_Optional__\[__PaginationType__\]_) – What kind of pagination you want. If None then defaults to PaginationType.FULL
    

Returns:

Either a list or an Iterator of lists of

BaseActivity child classes

Return type:

Union\[List\[BaseActivity\], Iterator\[List\[BaseActivity\]\]\]</content>
</page>

<page>
  <title>Calendar - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/calendar.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Get Market Calendar[#](#get-market-calendar "Permalink to this heading")
------------------------------------------------------------------------

BrokerClient.get\_calendar(_filters: Optional\[[GetCalendarRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetCalendarRequest "alpaca.trading.requests.GetCalendarRequest")\] \= None_) → Union\[List\[[Calendar](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Calendar "alpaca.trading.models.Calendar")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_calendar "Permalink to this definition")

The calendar API serves the full list of market days from 1970 to 2029. It can also be queried by specifying a start and/or end time to narrow down the results.

In addition to the dates, the response also contains the specific open and close times for the market days, taking into account early closures.

Parameters:

**filters** – Any optional filters to limit the returned market days

Returns:

A list of Calendar objects representing the market days.

Return type:

List\[[Calendar](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Calendar "alpaca.trading.models.Calendar")\]</content>
</page>

<page>
  <title>Clock - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/clock.html</url>
  <content>Toggle site navigation sidebar

[

Alpaca-py

](https://alpaca.markets/sdks/python/index.html)

Toggle table of contents sidebar

[Back to top](#)

Toggle table of contents sidebar

Get Market Clock[#](#get-market-clock "Permalink to this heading")
------------------------------------------------------------------

BrokerClient.get\_clock() → Union\[[Clock](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Clock "alpaca.trading.models.Clock"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_clock "Permalink to this definition")

Gets the current market timestamp, whether or not the market is currently open, as well as the times of the next market open and close.

Returns:

The market Clock data

Return type:

[Clock](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Clock "alpaca.trading.models.Clock")</content>
</page>

<page>
  <title>Documents - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/documents.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Get Trade Documents For Account[#](#get-trade-documents-for-account "Permalink to this heading")
------------------------------------------------------------------------------------------------

BrokerClient.get\_trade\_documents\_for\_account(_account\_id: Union\[UUID, str\]_, _documents\_filter: Optional\[[GetTradeDocumentsRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetTradeDocumentsRequest "alpaca.broker.requests.GetTradeDocumentsRequest")\] \= None_) → Union\[List\[[TradeDocument](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.documents.TradeDocument "alpaca.broker.models.documents.TradeDocument")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_trade_documents_for_account "Permalink to this definition")

Gets the list of TradeDocuments for an Account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the Account you wish to retrieve documents for. str values will attempt to be upcast into UUID instances
    
*   **documents\_filter** (_Optional__\[_[_GetTradeDocumentsRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetTradeDocumentsRequest "alpaca.broker.requests.GetTradeDocumentsRequest")_\]_) – The optional set of filters you can apply to filter the returned list.
    

Returns:

The filtered list of TradeDocuments

Return type:

List\[[TradeDocument](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.documents.TradeDocument "alpaca.broker.models.documents.TradeDocument")\]

Get Trade Document For Account By ID[#](#get-trade-document-for-account-by-id "Permalink to this heading")
----------------------------------------------------------------------------------------------------------

BrokerClient.get\_trade\_document\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _document\_id: Union\[UUID, str\]_) → Union\[[TradeDocument](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.documents.TradeDocument "alpaca.broker.models.documents.TradeDocument"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_trade_document_for_account_by_id "Permalink to this definition")

Gets a single TradeDocument by its id

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the Account that owns the document
    
*   **document\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the TradeDocument
    

Returns:

The requested TradeDocument

Return type:

[TradeDocument](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.documents.TradeDocument "alpaca.broker.models.documents.TradeDocument")

Raises:

[**APIError**](https://alpaca.markets/sdks/python/api_reference/common/exceptions.html#alpaca.common.exceptions.APIError "alpaca.common.exceptions.APIError") – Will raise an APIError if the account\_id or a matching document\_id for the account are not found.

Download Trade Document For Account By ID[#](#download-trade-document-for-account-by-id "Permalink to this heading")
--------------------------------------------------------------------------------------------------------------------

BrokerClient.download\_trade\_document\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _document\_id: Union\[UUID, str\]_, _file\_path: str_) → None[#](#alpaca.broker.client.BrokerClient.download_trade_document_for_account_by_id "Permalink to this definition")

Downloads a TradeDocument to file\_path

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – ID of the account to pull the document from
    
*   **document\_id** (_Union__\[__UUID__,_ _str__\]_) – ID of the document itself
    
*   **file\_path** (_str_) – A full path for where to save the file to
    

Return type:

None</content>
</page>

<page>
  <title>Corporate Actions - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/corporate-actions.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

The corporate actions endpoints allow you to retrieve data for splits, mergers, and other corporate events.

Get Corporate Actions[#](#get-corporate-actions "Permalink to this heading")
----------------------------------------------------------------------------

BrokerClient.get\_corporate\_announcements(_filter: [GetCorporateAnnouncementsRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetCorporateAnnouncementsRequest "alpaca.trading.requests.GetCorporateAnnouncementsRequest")_) → Union\[List\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_corporate_announcements "Permalink to this definition")

Returns corporate action announcements data given specified search criteria. :param filter: The parameters to filter the search by. :type filter: GetCorporateAnnouncementsRequest

Returns:

The resulting announcements from the search.

Return type:

List\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")\]

Get Corporate Action By ID[#](#get-corporate-action-by-id "Permalink to this heading")
--------------------------------------------------------------------------------------

BrokerClient.get\_corporate\_announcement\_by\_id(_corporate\_announcment\_id: Union\[UUID, str\]_) → Union\[[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_corporate_announcement_by_id "Permalink to this definition")

Returns a specific corporate action announcement. :param corporate\_announcment\_id: The id of the desired corporate action announcement

Returns:

The corporate action queried.

Return type:

[CorporateActionAnnouncement](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.CorporateActionAnnouncement "alpaca.trading.models.CorporateActionAnnouncement")</content>
</page>

<page>
  <title>Funding - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/funding.html</url>
  <content>Toggle table of contents sidebar

Create ACH Relationship For Account[#](#create-ach-relationship-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------------------------

BrokerClient.create\_ach\_relationship\_for\_account(_account\_id: Union\[UUID, str\]_, _ach\_data: Union\[[CreateACHRelationshipRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateACHRelationshipRequest "alpaca.broker.requests.CreateACHRelationshipRequest"), [CreatePlaidRelationshipRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreatePlaidRelationshipRequest "alpaca.broker.requests.CreatePlaidRelationshipRequest")\]_) → Union\[[ACHRelationship](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.ACHRelationship "alpaca.broker.models.funding.ACHRelationship"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_ach_relationship_for_account "Permalink to this definition")

Creates a single ACH relationship for the given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account that has the ACH Relationship.
    
*   **ach\_data** (_Union__\[_[_CreateACHRelationshipRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateACHRelationshipRequest "alpaca.broker.requests.CreateACHRelationshipRequest")_,_ [_CreatePlaidRelationshipRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreatePlaidRelationshipRequest "alpaca.broker.requests.CreatePlaidRelationshipRequest")_\]_) – The request data used to create the ACH relationship.
    

Returns:

The ACH relationship that was created.

Return type:

[ACHRelationship](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.ACHRelationship "alpaca.broker.models.funding.ACHRelationship")

Get ACH Relationships For Account[#](#get-ach-relationships-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------------------

BrokerClient.get\_ach\_relationships\_for\_account(_account\_id: Union\[UUID, str\]_, _statuses: Optional\[List\[[ACHRelationshipStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ACHRelationshipStatus "alpaca.broker.enums.ACHRelationshipStatus")\]\] \= None_) → Union\[List\[[ACHRelationship](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.ACHRelationship "alpaca.broker.models.funding.ACHRelationship")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_ach_relationships_for_account "Permalink to this definition")

Gets the ACH relationships for an account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to get the ACH relationships for.
    
*   **statuses** (_Optional__\[__List__\[_[_ACHRelationshipStatus_](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ACHRelationshipStatus "alpaca.broker.enums.ACHRelationshipStatus")_\]__\]_) – Optionally filter a subset of ACH relationship statuses.
    

Returns:

List of ACH relationships returned by the query.

Return type:

List\[[ACHRelationship](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.ACHRelationship "alpaca.broker.models.funding.ACHRelationship")\]

Delete ACH Relationship For Account[#](#delete-ach-relationship-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------------------------

BrokerClient.delete\_ach\_relationship\_for\_account(_account\_id: Union\[UUID, str\]_, _ach\_relationship\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.delete_ach_relationship_for_account "Permalink to this definition")

Delete an ACH Relation by its ID.

As the api itself returns a 204 on success this function returns nothing in the successful case and will raise an exception in any other case.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account which has the ACH relationship to be deleted.
    
*   **ach\_relationship\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the ACH relationship to delete.
    

Create Bank For Account[#](#create-bank-for-account "Permalink to this heading")
--------------------------------------------------------------------------------

BrokerClient.create\_bank\_for\_account(_account\_id: Union\[UUID, str\]_, _bank\_data: [CreateBankRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBankRequest "alpaca.broker.requests.CreateBankRequest")_) → Union\[[Bank](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Bank "alpaca.broker.models.funding.Bank"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_bank_for_account "Permalink to this definition")

Creates a single bank relationship for the given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to create the bank connection for.
    
*   **bank\_data** ([_CreateBankRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBankRequest "alpaca.broker.requests.CreateBankRequest")) – The request data used to create the bank connection.
    

Returns:

The Bank that was created.

Return type:

[Bank](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Bank "alpaca.broker.models.funding.Bank")

Get Banks For Account[#](#get-banks-for-account "Permalink to this heading")
----------------------------------------------------------------------------

BrokerClient.get\_banks\_for\_account(_account\_id: Union\[UUID, str\]_) → Union\[List\[[Bank](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Bank "alpaca.broker.models.funding.Bank")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_banks_for_account "Permalink to this definition")

Gets the Banks for an account.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to get the Banks for.

Returns:

List of Banks returned by the query.

Return type:

List\[[Bank](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Bank "alpaca.broker.models.funding.Bank")\]

Delete Bank For Account[#](#delete-bank-for-account "Permalink to this heading")
--------------------------------------------------------------------------------

BrokerClient.delete\_bank\_for\_account(_account\_id: Union\[UUID, str\]_, _bank\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.delete_bank_for_account "Permalink to this definition")

Delete a Bank by its ID.

As the api itself returns a 204 on success this function returns nothing in the successful case and will raise an exception in any other case.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account which has the Bank to be deleted.
    
*   **bank\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Bank to delete.
    

Create Transfer For Account[#](#create-transfer-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------

BrokerClient.create\_transfer\_for\_account(_account\_id: Union\[UUID, str\]_, _transfer\_data: Union\[[CreateACHTransferRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateACHTransferRequest "alpaca.broker.requests.CreateACHTransferRequest"), [CreateBankTransferRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBankTransferRequest "alpaca.broker.requests.CreateBankTransferRequest")\]_) → Union\[[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_transfer_for_account "Permalink to this definition")

Creates a single Transfer for the given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to create the bank connection for.
    
*   **transfer\_data** (_Union__\[_[_CreateACHTransferRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateACHTransferRequest "alpaca.broker.requests.CreateACHTransferRequest")_,_ [_CreateBankTransferRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBankTransferRequest "alpaca.broker.requests.CreateBankTransferRequest")_\]_) – The request data used to create the bank connection.
    

Returns:

The Transfer that was created.

Return type:

[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer")

Get Transfers For Account[#](#get-transfers-for-account "Permalink to this heading")
------------------------------------------------------------------------------------

BrokerClient.get\_transfers\_for\_account(_account\_id: Union\[UUID, str\]_, _transfers\_filter: Optional\[[GetTransfersRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetTransfersRequest "alpaca.broker.requests.GetTransfersRequest")\] \= None_, _max\_items\_limit: Optional\[int\] \= None_, _handle\_pagination: Optional\[PaginationType\] \= None_) → Union\[List\[[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer")\], Iterator\[List\[[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer")\]\]\][#](#alpaca.broker.client.BrokerClient.get_transfers_for_account "Permalink to this definition")

Gets the transfers for an account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to create the bank connection for.
    
*   **transfers\_filter** (_Optional__\[__GetTransferRequest__\]_) – The various filtering parameters to apply to the request.
    
*   **max\_items\_limit** (_Optional__\[__int__\]_) – A maximum number of items to return over all for when handle\_pagination is of type PaginationType.FULL. Ignored otherwise.
    
*   **handle\_pagination** (_Optional__\[__PaginationType__\]_) – What kind of pagination you want. If None then defaults to PaginationType.FULL.
    

Returns:

Either a list or an Iterator of lists of Transfer child

classes.

Return type:

Union\[List\[[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer")\], Iterator\[List\[[Transfer](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.funding.Transfer "alpaca.broker.models.funding.Transfer")\]\]\]

Cancel Transfer For Account[#](#cancel-transfer-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------

BrokerClient.cancel\_transfer\_for\_account(_account\_id: Union\[UUID, str\]_, _transfer\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.cancel_transfer_for_account "Permalink to this definition")

Cancel a Transfer by its ID.

As the api itself returns a 204 on success this function returns nothing in the successful case and will raise an exception in any other case.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account which has the Transfer to be canceled.
    
*   **transfer\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Transfer to cancel.</content>
</page>

<page>
  <title>Journals - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/journals.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Create a Journal[#](#create-a-journal "Permalink to this heading")
------------------------------------------------------------------

BrokerClient.create\_journal(_journal\_data: [CreateJournalRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateJournalRequest "alpaca.broker.requests.CreateJournalRequest")_) → Union\[[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_journal "Permalink to this definition")

The journal API allows you to transfer cash and securities between accounts.

Creates a new journal request.

Parameters:

**journal\_data** ([_CreateJournalRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateJournalRequest "alpaca.broker.requests.CreateJournalRequest")) – THe journal to be submitted.

Returns:

The submitted journal.

Return type:

[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal")

Create a Batch Journal[#](#create-a-batch-journal "Permalink to this heading")
------------------------------------------------------------------------------

BrokerClient.create\_batch\_journal(_batch\_data: [CreateBatchJournalRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBatchJournalRequest "alpaca.broker.requests.CreateBatchJournalRequest")_) → Union\[List\[[BatchJournalResponse](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.BatchJournalResponse "alpaca.broker.models.journals.BatchJournalResponse")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_batch_journal "Permalink to this definition")

A batch journal moves assets from one account into many others.

Currently, cash batch journals are supported.

Parameters:

**batch\_data** ([_CreateBatchJournalRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.CreateBatchJournalRequest "alpaca.broker.requests.CreateBatchJournalRequest")) – The batch journals to be submitted.

Returns:

The submitted batch journals.

Return type:

[BatchJournalResponse](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.BatchJournalResponse "alpaca.broker.models.journals.BatchJournalResponse")

Create a Reverse Batch Journal[#](#create-a-reverse-batch-journal "Permalink to this heading")
----------------------------------------------------------------------------------------------

BrokerClient.create\_reverse\_batch\_journal(_reverse\_batch\_data: CreateReverseBatchJournalRequest_) → Union\[List\[[BatchJournalResponse](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.BatchJournalResponse "alpaca.broker.models.journals.BatchJournalResponse")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_reverse_batch_journal "Permalink to this definition")

A reverse batch journal moves assets into one account from many others.

Currently, cash reverse batch journals are supported.

Parameters:

**reverse\_batch\_data** (_CreateReverseBatchJournalRequest_) – The reverse batch journals to be submitted.

Returns:

The submitted reverse batch journals.

Return type:

[BatchJournalResponse](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.BatchJournalResponse "alpaca.broker.models.journals.BatchJournalResponse")

Get all Journals[#](#get-all-journals "Permalink to this heading")
------------------------------------------------------------------

BrokerClient.get\_journals(_journal\_filter: Optional\[[GetJournalsRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetJournalsRequest "alpaca.broker.requests.GetJournalsRequest")\] \= None_) → Union\[List\[[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_journals "Permalink to this definition")

Returns journals from the master list.

Parameters:

**journal\_filter** (_Optional__\[_[_GetJournalsRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.GetJournalsRequest "alpaca.broker.requests.GetJournalsRequest")_\]_) – The parameters to filter the query by.

Returns:

The journals from the query.

Return type:

List\[[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal")\]

Get Journal by ID[#](#get-journal-by-id "Permalink to this heading")
--------------------------------------------------------------------

BrokerClient.get\_journal\_by\_id(_journal\_id: Union\[UUID, str\] \= None_) → Union\[[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_journal_by_id "Permalink to this definition")

Returns a specific journal by its id.

Parameters:

**journal\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the journal to retrieve.

Returns:

The journal with given id.

Return type:

[Journal](https://alpaca.markets/sdks/python/api_reference/broker/models.html#alpaca.broker.models.journals.Journal "alpaca.broker.models.journals.Journal")

Cancel Journal by ID[#](#cancel-journal-by-id "Permalink to this heading")
--------------------------------------------------------------------------

BrokerClient.cancel\_journal\_by\_id(_journal\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.cancel_journal_by_id "Permalink to this definition")

Cancels a specific journal by its id.

Parameters:

**journal\_id** (_Union__\[__UUID__,_ _str__\]_) – The id of the journal to be cancelled.

Returns:

None</content>
</page>

<page>
  <title>Trading - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/trading.html</url>
  <content>Toggle table of contents sidebar</content>
</page>

<page>
  <title>Orders - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/trading/orders.html</url>
  <content>Toggle table of contents sidebar

Submit an Order For Account[#](#submit-an-order-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------

BrokerClient.submit\_order\_for\_account(_account\_id: Union\[UUID, str\]_, _order\_data: [OrderRequest](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.OrderRequest "alpaca.broker.requests.OrderRequest")_) → Union\[Order, Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.submit_order_for_account "Permalink to this definition")

Creates an order to buy or sell an asset for an account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account the order will be created for.
    
*   **order\_data** ([_alpaca.broker.requests.OrderRequest_](https://alpaca.markets/sdks/python/api_reference/broker/requests.html#alpaca.broker.requests.OrderRequest "alpaca.broker.requests.OrderRequest")) – The request data for creating a new order.
    

Returns:

The resulting submitted order.

Return type:

alpaca.broker.models.OrderOrder

Get All Orders For Account[#](#get-all-orders-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------

BrokerClient.get\_orders\_for\_account(_account\_id: Union\[UUID, str\]_, _filter: Optional\[[GetOrdersRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrdersRequest "alpaca.trading.requests.GetOrdersRequest")\] \= None_) → Union\[List\[Order\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_orders_for_account "Permalink to this definition")

Returns all orders for an account. Orders can be filtered by parameters.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to get the orders for.
    
*   **filter** (_Optional__\[_[_GetOrdersRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrdersRequest "alpaca.trading.requests.GetOrdersRequest")_\]_) – The parameters to filter the orders with.
    

Returns:

The queried orders.

Return type:

List\[alpaca.broker.models.Order\]

Get an Order For Account By Id[#](#get-an-order-for-account-by-id "Permalink to this heading")
----------------------------------------------------------------------------------------------

BrokerClient.get\_order\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _order\_id: Union\[UUID, str\]_, _filter: Optional\[[GetOrderByIdRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrderByIdRequest "alpaca.trading.requests.GetOrderByIdRequest")\] \= None_) → Union\[Order, Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_order_for_account_by_id "Permalink to this definition")

Returns a specific order by its order id.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to get the order for.
    
*   **order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier for the order.
    
*   **filter** (_Optional__\[_[_GetOrderByIdRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetOrderByIdRequest "alpaca.trading.requests.GetOrderByIdRequest")_\]_) – The parameters for the query.
    

Returns:

The order that was queried.

Return type:

alpaca.broker.models.Order

Get an Order For Account By Client Id[#](#get-an-order-for-account-by-client-id "Permalink to this heading")
------------------------------------------------------------------------------------------------------------

BrokerClient.get\_order\_for\_account\_by\_client\_id(_account\_id: Union\[UUID, str\]_, _client\_id: str_) → Union\[Order, Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_order_for_account_by_client_id "Permalink to this definition")

Returns a specific order by its client order id.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to get the order for.
    
*   **client\_id** (_str_) – The client order identifier for the order.
    

Returns:

The queried order.

Return type:

alpaca.broker.models.Order

Replace an Order For Account By Id[#](#replace-an-order-for-account-by-id "Permalink to this heading")
------------------------------------------------------------------------------------------------------

BrokerClient.replace\_order\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _order\_id: Union\[UUID, str\]_, _order\_data: Optional\[[ReplaceOrderRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ReplaceOrderRequest "alpaca.trading.requests.ReplaceOrderRequest")\] \= None_) → Union\[Order, Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.replace_order_for_account_by_id "Permalink to this definition")

Updates an order with new parameters.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to replace the order for.
    
*   **order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier for the order being replaced.
    
*   **order\_data** (_Optional__\[_[_ReplaceOrderRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ReplaceOrderRequest "alpaca.trading.requests.ReplaceOrderRequest")_\]_) – The parameters we wish to update.
    

Returns:

The updated order.

Return type:

alpaca.broker.models.Order

Cancel All Orders For Account[#](#cancel-all-orders-for-account "Permalink to this heading")
--------------------------------------------------------------------------------------------

BrokerClient.cancel\_orders\_for\_account(_account\_id: Union\[UUID, str\]_) → Union\[List\[[CancelOrderResponse](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CancelOrderResponse "alpaca.trading.requests.CancelOrderResponse")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.cancel_orders_for_account "Permalink to this definition")

Cancels all orders.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to cancel the orders for.

Returns:

The list of HTTP statuses for each order attempted to be cancelled.

Return type:

List\[[CancelOrderResponse](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CancelOrderResponse "alpaca.trading.requests.CancelOrderResponse")\]

Cancel an Order For Account By Id[#](#cancel-an-order-for-account-by-id "Permalink to this heading")
----------------------------------------------------------------------------------------------------

BrokerClient.cancel\_order\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _order\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.cancel_order_for_account_by_id "Permalink to this definition")

Cancels a specific order by its order id.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to cancel the order for.
    
*   **order\_id** (_Union__\[__UUID__,_ _str__\]_) – The unique uuid identifier of the order being cancelled.</content>
</page>

<page>
  <title>Portfolio History - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/trading/portfolio-history.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Get Portfolio History For Account[#](#get-portfolio-history-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------------------

BrokerClient.get\_portfolio\_history\_for\_account(_account\_id: Union\[UUID, str\]_, _history\_filter: Optional\[[GetPortfolioHistoryRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.GetPortfolioHistoryRequest "alpaca.trading.requests.GetPortfolioHistoryRequest")\] \= None_) → Union\[[PortfolioHistory](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.PortfolioHistory "alpaca.trading.models.PortfolioHistory"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_portfolio_history_for_account "Permalink to this definition")

Gets the portfolio history statistics for an account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to get the portfolio history for.
    
*   **history\_filter** – The various portfolio history request parameters.
    

Returns:

The portfolio history statistics for the account.

Return type:

[PortfolioHistory](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.PortfolioHistory "alpaca.trading.models.PortfolioHistory")</content>
</page>

<page>
  <title>Positions - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/trading/positions.html</url>
  <content>[Back to top](#)

Toggle table of contents sidebar

Get All Open Positions For Account[#](#get-all-open-positions-for-account "Permalink to this heading")
------------------------------------------------------------------------------------------------------

BrokerClient.get\_all\_positions\_for\_account(_account\_id: Union\[UUID, str\]_) → Union\[List\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_all_positions_for_account "Permalink to this definition")

Gets all the current positions for an account.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to get the open positions for.

Returns:

List of open positions from the account.

Return type:

List\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")\]

Get A Open Position For Account[#](#get-a-open-position-for-account "Permalink to this heading")
------------------------------------------------------------------------------------------------

BrokerClient.get\_open\_position\_for\_account(_account\_id: Union\[UUID, str\]_, _symbol\_or\_asset\_id: Union\[UUID, str\]_) → Union\[[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_open_position_for_account "Permalink to this definition")

Gets the open position for an account for a single asset. Throws an APIError if the position does not exist.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to get the open position for.
    
*   **symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol name of asset id of the position to get from the account.
    

Returns:

Open position of the asset from the account.

Return type:

[Position](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Position "alpaca.trading.models.Position")

Close All Positions For Account[#](#close-all-positions-for-account "Permalink to this heading")
------------------------------------------------------------------------------------------------

BrokerClient.close\_all\_positions\_for\_account(_account\_id: Union\[UUID, str\]_, _cancel\_orders: Optional\[bool\] \= None_) → Union\[List\[[ClosePositionResponse](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.ClosePositionResponse "alpaca.trading.models.ClosePositionResponse")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.close_all_positions_for_account "Permalink to this definition")

Liquidates all positions for an account.

Places an order for each open position to liquidate.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to close the positions for.
    
*   **cancel\_orders** (_Optional__\[__bool__\]_) – If true is specified, cancel all open orders before liquidating all positions.
    

Returns:

A list of responses from each closed position containing the status code and

order id.

Return type:

List\[[ClosePositionResponse](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.ClosePositionResponse "alpaca.trading.models.ClosePositionResponse")\]

Close A Position For Account[#](#close-a-position-for-account "Permalink to this heading")
------------------------------------------------------------------------------------------

BrokerClient.close\_position\_for\_account(_account\_id: Union\[UUID, str\]_, _symbol\_or\_asset\_id: Union\[UUID, str\]_, _close\_options: Optional\[[ClosePositionRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.ClosePositionRequest "alpaca.trading.requests.ClosePositionRequest")\] \= None_) → Union\[Order, Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.close_position_for_account "Permalink to this definition")

Liquidates the position for an account for a single asset.

Places a single order to close the position for the asset.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The ID of the Account to close the position for.
    
*   **symbol\_or\_asset\_id** (_Union__\[__UUID__,_ _str__\]_) – The symbol name of asset id of the position to close on the account.
    
*   **close\_options** – The various close position request parameters.
    

Returns:

The order that was placed to close the position.

Return type:

alpaca.broker.models.Order</content>
</page>

<page>
  <title>Watchlists - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/trading/watchlists.html</url>
  <content>Toggle table of contents sidebar

Create a Watchlist For Account[#](#create-a-watchlist-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------------

BrokerClient.create\_watchlist\_for\_account(_account\_id: Union\[UUID, str\]_, _watchlist\_data: [CreateWatchlistRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CreateWatchlistRequest "alpaca.trading.requests.CreateWatchlistRequest")_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.create_watchlist_for_account "Permalink to this definition")

Creates a new watchlist for a given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to create a new watchlist for.
    
*   **watchlist\_data** ([_CreateWatchlistRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.CreateWatchlistRequest "alpaca.trading.requests.CreateWatchlistRequest")) – The watchlist to create.
    

Returns:

The new watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Get All Watchlists For Account[#](#get-all-watchlists-for-account "Permalink to this heading")
----------------------------------------------------------------------------------------------

BrokerClient.get\_watchlists\_for\_account(_account\_id: Union\[UUID, str\]_) → Union\[List\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")\], Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_watchlists_for_account "Permalink to this definition")

Returns all watchlists for an account.

Parameters:

**account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to retrieve watchlists for

Returns:

The watchlists for that account

Return type:

List\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")\]

Get Watchlist For Account By Id[#](#get-watchlist-for-account-by-id "Permalink to this heading")
------------------------------------------------------------------------------------------------

BrokerClient.get\_watchlist\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _watchlist\_id: Union\[UUID, str\]_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.get_watchlist_for_account_by_id "Permalink to this definition")

Returns a specific watchlist by its id for a given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account to retrieve watchlist data for.
    
*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to retrieve.
    

Returns:

The watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Update Watchlist For Account By Id[#](#update-watchlist-for-account-by-id "Permalink to this heading")
------------------------------------------------------------------------------------------------------

BrokerClient.update\_watchlist\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _watchlist\_id: Union\[UUID, str\]_, _watchlist\_data: [UpdateWatchlistRequest](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.UpdateWatchlistRequest "alpaca.trading.requests.UpdateWatchlistRequest")_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.update_watchlist_for_account_by_id "Permalink to this definition")

Updates a watchlist with new data.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account whose watchlist to be updated.
    
*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to be updated.
    
*   **watchlist\_data** ([_UpdateWatchlistRequest_](https://alpaca.markets/sdks/python/api_reference/trading/requests.html#alpaca.trading.requests.UpdateWatchlistRequest "alpaca.trading.requests.UpdateWatchlistRequest")) – The new watchlist data.
    

Returns:

The watchlist with updated data.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Delete Watchlist From Account By Id[#](#delete-watchlist-from-account-by-id "Permalink to this heading")
--------------------------------------------------------------------------------------------------------

BrokerClient.delete\_watchlist\_from\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _watchlist\_id: Union\[UUID, str\]_) → None[#](#alpaca.broker.client.BrokerClient.delete_watchlist_from_account_by_id "Permalink to this definition")

Deletes a watchlist. This is permanent.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account the watchlist belongs to.
    
*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to delete.
    

Returns:

None

Add Asset To Watchlist For Account By Id[#](#add-asset-to-watchlist-for-account-by-id "Permalink to this heading")
------------------------------------------------------------------------------------------------------------------

BrokerClient.add\_asset\_to\_watchlist\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _watchlist\_id: Union\[UUID, str\]_, _symbol: str_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.add_asset_to_watchlist_for_account_by_id "Permalink to this definition")

Adds an asset by its symbol to a specified watchlist for a given account. :param account\_id: The account id that the watchlist belongs to. :type account\_id: Union\[UUID, str\] :param watchlist\_id: The watchlist to add the symbol to. :type watchlist\_id: Union\[UUID, str\] :param symbol: The symbol for the asset to add. :type symbol: str

Returns:

The updated watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")

Remove Asset From Watchlist For Account By Id[#](#remove-asset-from-watchlist-for-account-by-id "Permalink to this heading")
----------------------------------------------------------------------------------------------------------------------------

BrokerClient.remove\_asset\_from\_watchlist\_for\_account\_by\_id(_account\_id: Union\[UUID, str\]_, _watchlist\_id: Union\[UUID, str\]_, _symbol: str_) → Union\[[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist"), Dict\[str, Any\]\][#](#alpaca.broker.client.BrokerClient.remove_asset_from_watchlist_for_account_by_id "Permalink to this definition")

Removes an asset from a watchlist for a given account.

Parameters:

*   **account\_id** (_Union__\[__UUID__,_ _str__\]_) – The account the watchlist belongs to.
    
*   **watchlist\_id** (_Union__\[__UUID__,_ _str__\]_) – The watchlist to remove the asset from.
    
*   **symbol** (_str_) – The symbol for the asset to add.
    

Returns:

The updated watchlist.

Return type:

[Watchlist](https://alpaca.markets/sdks/python/api_reference/trading/models.html#alpaca.trading.models.Watchlist "alpaca.trading.models.Watchlist")</content>
</page>

<page>
  <title>Models - Alpaca-py</title>
  <url>https://alpaca.markets/sdks/python/api_reference/broker/models.html</url>
  <content>Account[#](#account "Permalink to this heading")
------------------------------------------------

_class_ alpaca.broker.models.accounts.Account(_\*_, _id: UUID_, _account\_number: str_, _status: [AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")_, _crypto\_status: Optional\[[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")\] \= None_, _kyc\_results: Optional\[KycResults\] \= None_, _currency: str_, _last\_equity: str_, _created\_at: str_, _contact: Optional\[[Contact](#alpaca.broker.models.accounts.Contact "alpaca.broker.models.accounts.Contact")\] \= None_, _identity: Optional\[[Identity](#alpaca.broker.models.accounts.Identity "alpaca.broker.models.accounts.Identity")\] \= None_, _disclosures: Optional\[[Disclosures](#alpaca.broker.models.accounts.Disclosures "alpaca.broker.models.accounts.Disclosures")\] \= None_, _agreements: Optional\[List\[[Agreement](#alpaca.broker.models.accounts.Agreement "alpaca.broker.models.accounts.Agreement")\]\] \= None_, _documents: Optional\[List\[[AccountDocument](#alpaca.broker.models.documents.AccountDocument "alpaca.broker.models.documents.AccountDocument")\]\] \= None_, _trusted\_contact: Optional\[[TrustedContact](#alpaca.broker.models.accounts.TrustedContact "alpaca.broker.models.accounts.TrustedContact")\] \= None_)[#](#alpaca.broker.models.accounts.Account "Permalink to this definition")

Contains information pertaining to a specific brokerage account

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

The fields contact, identity, disclosures, agreements, documents, trusted\_contact, and trading\_configurations are all optional and won’t always be provided by the api depending on what endpoint you use and what options you pass

id[#](#alpaca.broker.models.accounts.Account.id "Permalink to this definition")

The account uuid used to reference this account

Type:

str

account\_number[#](#alpaca.broker.models.accounts.Account.account_number "Permalink to this definition")

A more human friendly identifier for this account

Type:

str

status[#](#alpaca.broker.models.accounts.Account.status "Permalink to this definition")

The approval status of this account

Type:

[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")

crypto\_status[#](#alpaca.broker.models.accounts.Account.crypto_status "Permalink to this definition")

The crypto trading status. Only present if crypto trading is enabled.

Type:

Optional\[[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")\]

kyc\_results[#](#alpaca.broker.models.accounts.Account.kyc_results "Permalink to this definition")

Hold information about the result of KYC.

Type:

Optional\[KycResult\]

currency[#](#alpaca.broker.models.accounts.Account.currency "Permalink to this definition")

The currency the account’s values are returned in

Type:

str

last\_equity[#](#alpaca.broker.models.accounts.Account.last_equity "Permalink to this definition")

The total equity value stored in the account

Type:

str

created\_at[#](#alpaca.broker.models.accounts.Account.created_at "Permalink to this definition")

The timestamp when the account was created

Type:

str

contact[#](#alpaca.broker.models.accounts.Account.contact "Permalink to this definition")

The contact details for the account holder

Type:

Optional\[[Contact](#alpaca.broker.models.accounts.Contact "alpaca.broker.models.accounts.Contact")\]

identity[#](#alpaca.broker.models.accounts.Account.identity "Permalink to this definition")

The identity details for the account holder

Type:

Optional\[[Identity](#alpaca.broker.models.accounts.Identity "alpaca.broker.models.accounts.Identity")\]

disclosures[#](#alpaca.broker.models.accounts.Account.disclosures "Permalink to this definition")

The account holder’s political disclosures

Type:

Optional\[[Disclosures](#alpaca.broker.models.accounts.Disclosures "alpaca.broker.models.accounts.Disclosures")\]

agreements[#](#alpaca.broker.models.accounts.Account.agreements "Permalink to this definition")

The agreements the account holder has signed

Type:

Optional\[List\[[Agreement](#alpaca.broker.models.accounts.Agreement "alpaca.broker.models.accounts.Agreement")\]\]

documents[#](#alpaca.broker.models.accounts.Account.documents "Permalink to this definition")

The documents the account holder has submitted

Type:

Optional\[List\[[AccountDocument](#alpaca.broker.models.documents.AccountDocument "alpaca.broker.models.documents.AccountDocument")\]\]

trusted\_contact[#](#alpaca.broker.models.accounts.Account.trusted_contact "Permalink to this definition")

The account holder’s trusted contact details

Type:

Optional\[[TrustedContact](#alpaca.broker.models.accounts.TrustedContact "alpaca.broker.models.accounts.TrustedContact")\]

### Contact[#](#contact "Permalink to this heading")

_class_ alpaca.broker.models.accounts.Contact(_\*_, _email\_address: str_, _phone\_number: Optional\[str\] \= None_, _street\_address: List\[str\]_, _unit: Optional\[str\] \= None_, _city: str_, _state: Optional\[str\] \= None_, _postal\_code: Optional\[str\] \= None_, _country: Optional\[str\] \= None_)[#](#alpaca.broker.models.accounts.Contact "Permalink to this definition")

User contact details within Account Model

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

email\_address[#](#alpaca.broker.models.accounts.Contact.email_address "Permalink to this definition")

The user’s email address

Type:

str

phone\_number[#](#alpaca.broker.models.accounts.Contact.phone_number "Permalink to this definition")

The user’s phone number. It should include the country code.

Type:

str

street\_address[#](#alpaca.broker.models.accounts.Contact.street_address "Permalink to this definition")

The user’s street address lines.

Type:

List\[str\]

unit[#](#alpaca.broker.models.accounts.Contact.unit "Permalink to this definition")

The user’s apartment unit, if any.

Type:

Optional\[str\]

city[#](#alpaca.broker.models.accounts.Contact.city "Permalink to this definition")

The city the user resides in.

Type:

str

state[#](#alpaca.broker.models.accounts.Contact.state "Permalink to this definition")

The state the user resides in. This is required if country is ‘USA’.

Type:

Optional\[str\]

postal\_code[#](#alpaca.broker.models.accounts.Contact.postal_code "Permalink to this definition")

The user’s postal

Type:

str

country[#](#alpaca.broker.models.accounts.Contact.country "Permalink to this definition")

The country the user resides in. 3 letter country code is permissible.

Type:

str

### Identity[#](#identity "Permalink to this heading")

_class_ alpaca.broker.models.accounts.Identity(_\*_, _given\_name: str_, _middle\_name: Optional\[str\] \= None_, _family\_name: str_, _date\_of\_birth: Optional\[str\] \= None_, _tax\_id: Optional\[str\] \= None_, _tax\_id\_type: Optional\[[TaxIdType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TaxIdType "alpaca.broker.enums.TaxIdType")\] \= None_, _country\_of\_citizenship: Optional\[str\] \= None_, _country\_of\_birth: Optional\[str\] \= None_, _country\_of\_tax\_residence: str_, _visa\_type: Optional\[[VisaType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.VisaType "alpaca.broker.enums.VisaType")\] \= None_, _visa\_expiration\_date: Optional\[str\] \= None_, _date\_of\_departure\_from\_usa: Optional\[str\] \= None_, _permanent\_resident: Optional\[bool\] \= None_, _funding\_source: Optional\[List\[[FundingSource](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.FundingSource "alpaca.broker.enums.FundingSource")\]\] \= None_, _annual\_income\_min: Optional\[float\] \= None_, _annual\_income\_max: Optional\[float\] \= None_, _liquid\_net\_worth\_min: Optional\[float\] \= None_, _liquid\_net\_worth\_max: Optional\[float\] \= None_, _total\_net\_worth\_min: Optional\[float\] \= None_, _total\_net\_worth\_max: Optional\[float\] \= None_)[#](#alpaca.broker.models.accounts.Identity "Permalink to this definition")

User identity details within Account Model

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

given\_name[#](#alpaca.broker.models.accounts.Identity.given_name "Permalink to this definition")

The user’s first name

Type:

str

middle\_name[#](#alpaca.broker.models.accounts.Identity.middle_name "Permalink to this definition")

The user’s middle name, if any

Type:

Optional\[str\]

family\_name[#](#alpaca.broker.models.accounts.Identity.family_name "Permalink to this definition")

The user’s last name

Type:

str

date\_of\_birth[#](#alpaca.broker.models.accounts.Identity.date_of_birth "Permalink to this definition")

The user’s date of birth

Type:

str

tax\_id[#](#alpaca.broker.models.accounts.Identity.tax_id "Permalink to this definition")

The user’s country specific tax id, required if tax\_id\_type is provided

Type:

Optional\[str\]

tax\_id\_type[#](#alpaca.broker.models.accounts.Identity.tax_id_type "Permalink to this definition")

The tax\_id\_type for the tax\_id provided, required if tax\_id provided

Type:

Optional\[[TaxIdType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TaxIdType "alpaca.broker.enums.TaxIdType")\]

country\_of\_citizenship[#](#alpaca.broker.models.accounts.Identity.country_of_citizenship "Permalink to this definition")

The country the user is a citizen

Type:

Optional\[str\]

country\_of\_birth[#](#alpaca.broker.models.accounts.Identity.country_of_birth "Permalink to this definition")

The country the user was born

Type:

Optional\[str\]

country\_of\_tax\_residence[#](#alpaca.broker.models.accounts.Identity.country_of_tax_residence "Permalink to this definition")

The country the user files taxes

Type:

str

visa\_type[#](#alpaca.broker.models.accounts.Identity.visa_type "Permalink to this definition")

Only used to collect visa types for users residing in the USA.

Type:

Optional\[[VisaType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.VisaType "alpaca.broker.enums.VisaType")\]

visa\_expiration\_date[#](#alpaca.broker.models.accounts.Identity.visa_expiration_date "Permalink to this definition")

The date of expiration for visa, Required if visa\_type is set.

Type:

Optional\[str\]

date\_of\_departure\_from\_usa[#](#alpaca.broker.models.accounts.Identity.date_of_departure_from_usa "Permalink to this definition")

Required if visa\_type = B1 or B2

Type:

Optional\[str\]

permanent\_resident[#](#alpaca.broker.models.accounts.Identity.permanent_resident "Permalink to this definition")

Only used to collect permanent residence status in the USA.

Type:

Optional\[bool\]

funding\_source[#](#alpaca.broker.models.accounts.Identity.funding_source "Permalink to this definition")

How the user will fund their account

Type:

Optional\[List\[[FundingSource](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.FundingSource "alpaca.broker.enums.FundingSource")\]\]

annual\_income\_min[#](#alpaca.broker.models.accounts.Identity.annual_income_min "Permalink to this definition")

The minimum of the user’s income range

Type:

Optional\[float\]

annual\_income\_max[#](#alpaca.broker.models.accounts.Identity.annual_income_max "Permalink to this definition")

The maximum of the user’s income range

Type:

Optional\[float\]

liquid\_net\_worth\_min[#](#alpaca.broker.models.accounts.Identity.liquid_net_worth_min "Permalink to this definition")

The minimum of the user’s liquid net worth range

Type:

Optional\[float\]

liquid\_net\_worth\_max[#](#alpaca.broker.models.accounts.Identity.liquid_net_worth_max "Permalink to this definition")

The maximum of the user’s liquid net worth range

Type:

Optional\[float\]

total\_net\_worth\_min[#](#alpaca.broker.models.accounts.Identity.total_net_worth_min "Permalink to this definition")

The minimum of the user’s total net worth range

Type:

Optional\[float\]

total\_net\_worth\_max[#](#alpaca.broker.models.accounts.Identity.total_net_worth_max "Permalink to this definition")

The maximum of the user’s total net worth range

Type:

Optional\[float\]

### Disclosures[#](#disclosures "Permalink to this heading")

_class_ alpaca.broker.models.accounts.Disclosures(_\*_, _is\_control\_person: Optional\[bool\] \= None_, _is\_affiliated\_exchange\_or\_finra: Optional\[bool\] \= None_, _is\_politically\_exposed: Optional\[bool\] \= None_, _immediate\_family\_exposed: bool_, _employment\_status: Optional\[[EmploymentStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.EmploymentStatus "alpaca.broker.enums.EmploymentStatus")\] \= None_, _employer\_name: Optional\[str\] \= None_, _employer\_address: Optional\[str\] \= None_, _employment\_position: Optional\[str\] \= None_)[#](#alpaca.broker.models.accounts.Disclosures "Permalink to this definition")

User disclosures within Account Model

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

is\_control\_person[#](#alpaca.broker.models.accounts.Disclosures.is_control_person "Permalink to this definition")

Whether user holds a controlling position in a publicly traded company

Type:

bool

is\_affiliated\_exchange\_or\_finra[#](#alpaca.broker.models.accounts.Disclosures.is_affiliated_exchange_or_finra "Permalink to this definition")

If user is affiliated with any exchanges or FINRA

Type:

bool

is\_politically\_exposed[#](#alpaca.broker.models.accounts.Disclosures.is_politically_exposed "Permalink to this definition")

If user is politically exposed

Type:

bool

immediate\_family\_exposed[#](#alpaca.broker.models.accounts.Disclosures.immediate_family_exposed "Permalink to this definition")

If user’s immediate family member is either politically exposed or holds a control position.

Type:

bool

employment\_status[#](#alpaca.broker.models.accounts.Disclosures.employment_status "Permalink to this definition")

The employment status of the user

Type:

[EmploymentStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.EmploymentStatus "alpaca.broker.enums.EmploymentStatus")

employer\_name[#](#alpaca.broker.models.accounts.Disclosures.employer_name "Permalink to this definition")

The user’s employer’s name, if any

Type:

str

employer\_address[#](#alpaca.broker.models.accounts.Disclosures.employer_address "Permalink to this definition")

The user’s employer’s address, if any

Type:

str

employment\_position[#](#alpaca.broker.models.accounts.Disclosures.employment_position "Permalink to this definition")

The user’s employment position, if any

Type:

str

### Agreement[#](#agreement "Permalink to this heading")

_class_ alpaca.broker.models.accounts.Agreement(_\*_, _agreement: [AgreementType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.AgreementType "alpaca.broker.enums.AgreementType")_, _signed\_at: str_, _ip\_address: str_, _revision: Optional\[str\] \= None_)[#](#alpaca.broker.models.accounts.Agreement "Permalink to this definition")

User agreements signed within Account Model

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

agreement[#](#alpaca.broker.models.accounts.Agreement.agreement "Permalink to this definition")

The type of agreement signed by the user

Type:

[Agreement](#alpaca.broker.models.accounts.Agreement "alpaca.broker.models.accounts.Agreement")

signed\_at[#](#alpaca.broker.models.accounts.Agreement.signed_at "Permalink to this definition")

The timestamp the agreement was signed

Type:

str

ip\_address[#](#alpaca.broker.models.accounts.Agreement.ip_address "Permalink to this definition")

The ip\_address the signed agreements were sent from by the user

Type:

str

revision[#](#alpaca.broker.models.accounts.Agreement.revision "Permalink to this definition")

The revision date

Type:

str

### TrustedContact[#](#trustedcontact "Permalink to this heading")

_class_ alpaca.broker.models.accounts.TrustedContact(_\*_, _given\_name: str_, _family\_name: str_, _email\_address: Optional\[str\] \= None_, _phone\_number: Optional\[str\] \= None_, _street\_address: Optional\[str\] \= None_, _city: Optional\[str\] \= None_, _state: Optional\[str\] \= None_, _postal\_code: Optional\[str\] \= None_, _country: Optional\[str\] \= None_)[#](#alpaca.broker.models.accounts.TrustedContact "Permalink to this definition")

User’s trusted contact details within Account Model

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

Attributes:given\_name

given\_name (str): The first name of the user’s trusted contact family\_name (str): The last name of the user’s trusted contact email\_address (Optional\[str\]): The email address of the user’s trusted contact phone\_number (Optional\[str\]): The email address of the user’s trusted contact city (Optional\[str\]): The email address of the user’s trusted contact state (Optional\[str\]): The email address of the user’s trusted contact postal\_code (Optional\[str\]): The email address of the user’s trusted contact country (Optional\[str\]): The email address of the user’s trusted contact

### AccountDocument[#](#accountdocument "Permalink to this heading")

_class_ alpaca.broker.models.documents.AccountDocument(_\*_, _id: Optional\[UUID\]_, _document\_type: Optional\[[DocumentType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.DocumentType "alpaca.broker.enums.DocumentType")\]_, _document\_sub\_type: Optional\[str\] \= None_, _content: Optional\[str\] \= None_, _mime\_type: Optional\[str\] \= None_)[#](#alpaca.broker.models.documents.AccountDocument "Permalink to this definition")

User documents provided within Account Model.

This model is different from the TradeDocument model in that this model represents documents having to do with a brokerage Account.

see [https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model](https://alpaca.markets/docs/broker/api-references/accounts/accounts/#the-account-model)

id[#](#alpaca.broker.models.documents.AccountDocument.id "Permalink to this definition")

ID of the Document

Type:

UUID

document\_type[#](#alpaca.broker.models.documents.AccountDocument.document_type "Permalink to this definition")

The type of document uploaded

Type:

[DocumentType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.DocumentType "alpaca.broker.enums.DocumentType")

document\_sub\_type[#](#alpaca.broker.models.documents.AccountDocument.document_sub_type "Permalink to this definition")

The specific type of document, e.g. passport

Type:

Optional\[str\]

name[#](#alpaca.broker.models.documents.AccountDocument.name "Permalink to this definition")

Name of the document if present

Type:

Optional(str)

content[#](#alpaca.broker.models.documents.AccountDocument.content "Permalink to this definition")

Base64 string representing the document

Type:

str

mime\_type[#](#alpaca.broker.models.documents.AccountDocument.mime_type "Permalink to this definition")

The format of content encoded by the string

Type:

str

TradeAccount[#](#tradeaccount "Permalink to this heading")
----------------------------------------------------------

_class_ alpaca.broker.models.accounts.TradeAccount(_\*_, _id: UUID_, _account\_number: str_, _status: [AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")_, _crypto\_status: Optional\[[AccountStatus](https://alpaca.markets/sdks/python/api_reference/trading/enums.html#alpaca.trading.enums.AccountStatus "alpaca.trading.enums.AccountStatus")\] \= None_, _currency: Optional\[str\] \= None_, _buying\_power: Optional\[str\] \= None_, _regt\_buying\_power: Optional\[str\] \= None_, _daytrading\_buying\_power: Optional\[str\] \= None_, _non\_marginable\_buying\_power: Optional\[str\] \= None_, _cash: Optional\[str\] \= None_, _accrued\_fees: Optional\[str\] \= None_, _pending\_transfer\_out: Optional\[str\] \= None_, _pending\_transfer\_in: Optional\[str\] \= None_, _portfolio\_value: Optional\[str\] \= None_, _pattern\_day\_trader: Optional\[bool\] \= None_, _trading\_blocked: Optional\[bool\] \= None_, _transfers\_blocked: Optional\[bool\] \= None_, _account\_blocked: Optional\[bool\] \= None_, _created\_at: Optional\[datetime\] \= None_, _trade\_suspended\_by\_user: Optional\[bool\] \= None_, _multiplier: Optional\[str\] \= None_, _shorting\_enabled: Optional\[bool\] \= None_, _equity: Optional\[str\] \= None_, _last\_equity: Optional\[str\] \= None_, _long\_market\_value: Optional\[str\] \= None_, _short\_market\_value: Optional\[str\] \= None_, _initial\_margin: Optional\[str\] \= None_, _maintenance\_margin: Optional\[str\] \= None_, _last\_maintenance\_margin: Optional\[str\] \= None_, _sma: Optional\[str\] \= None_, _daytrade\_count: Optional\[int\] \= None_, _options\_buying\_power: Optional\[str\] \= None_, _options\_approved\_level: Optional\[int\] \= None_, _options\_trading\_level: Optional\[int\] \= None_, _cash\_withdrawable: Optional\[str\]_, _cash\_transferable: Optional\[str\]_, _previous\_close: Optional\[datetime\]_, _last\_long\_market\_value: Optional\[str\]_, _last\_short\_market\_value: Optional\[str\]_, _last\_cash: Optional\[str\]_, _last\_initial\_margin: Optional\[str\]_, _last\_regt\_buying\_power: Optional\[str\]_, _last\_daytrading\_buying\_power: Optional\[str\]_, _last\_daytrade\_count: Optional\[int\]_, _last\_buying\_power: Optional\[str\]_, _clearing\_broker: Optional\[[ClearingBroker](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ClearingBroker "alpaca.broker.enums.ClearingBroker")\]_)[#](#alpaca.broker.models.accounts.TradeAccount "Permalink to this definition")

See Base TradeAccount model in common for full details on available fields. Represents trading account information for an Account.

cash\_withdrawable[#](#alpaca.broker.models.accounts.TradeAccount.cash_withdrawable "Permalink to this definition")

Cash available for withdrawal from the account

Type:

Optional\[str\]

cash\_transferable[#](#alpaca.broker.models.accounts.TradeAccount.cash_transferable "Permalink to this definition")

Cash available for transfer (JNLC) from the account

Type:

Optional\[str\]

previous\_close[#](#alpaca.broker.models.accounts.TradeAccount.previous_close "Permalink to this definition")

Previous sessions close time

Type:

Optional\[datetime\]

last\_long\_market\_value[#](#alpaca.broker.models.accounts.TradeAccount.last_long_market_value "Permalink to this definition")

Value of all long positions as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_short\_market\_value[#](#alpaca.broker.models.accounts.TradeAccount.last_short_market_value "Permalink to this definition")

Value of all short positions as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_cash[#](#alpaca.broker.models.accounts.TradeAccount.last_cash "Permalink to this definition")

Value of all cash as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_initial\_margin[#](#alpaca.broker.models.accounts.TradeAccount.last_initial_margin "Permalink to this definition")

Value of initial\_margin as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_regt\_buying\_power[#](#alpaca.broker.models.accounts.TradeAccount.last_regt_buying_power "Permalink to this definition")

Value of regt\_buying\_power as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_daytrading\_buying\_power[#](#alpaca.broker.models.accounts.TradeAccount.last_daytrading_buying_power "Permalink to this definition")

Value of daytrading\_buying\_power as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

last\_daytrade\_count[#](#alpaca.broker.models.accounts.TradeAccount.last_daytrade_count "Permalink to this definition")

Value of daytrade\_count as of previous trading day at 16:00:00 ET

Type:

Optional\[int\]

last\_buying\_power[#](#alpaca.broker.models.accounts.TradeAccount.last_buying_power "Permalink to this definition")

Value of buying\_power as of previous trading day at 16:00:00 ET

Type:

Optional\[str\]

clearing\_broker[#](#alpaca.broker.models.accounts.TradeAccount.clearing_broker "Permalink to this definition")

The Clearing broker for this account

Type:

Optional\[[ClearingBroker](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ClearingBroker "alpaca.broker.enums.ClearingBroker")\]

### TradeDocument[#](#tradedocument "Permalink to this heading")

_class_ alpaca.broker.models.documents.TradeDocument(_\*_, _id: UUID_, _name: str_, _type: [TradeDocumentType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TradeDocumentType "alpaca.broker.enums.TradeDocumentType")_, _sub\_type: Optional\[[TradeDocumentSubType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TradeDocumentSubType "alpaca.broker.enums.TradeDocumentSubType")\] \= None_, _date: date_)[#](#alpaca.broker.models.documents.TradeDocument "Permalink to this definition")

Similar to the AccountDocument model but this represents documents having to do with a TradeAccount not a regular Account.

IE: Account Monthly Statements or Trade Confirmations.

id[#](#alpaca.broker.models.documents.TradeDocument.id "Permalink to this definition")

Unique id of the TradeDocument

Type:

UUID

name[#](#alpaca.broker.models.documents.TradeDocument.name "Permalink to this definition")

Name of the document

Type:

str

type[#](#alpaca.broker.models.documents.TradeDocument.type "Permalink to this definition")

The kind of TradeDocument this is

Type:

[TradeDocumentType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TradeDocumentType "alpaca.broker.enums.TradeDocumentType")

sub\_type[#](#alpaca.broker.models.documents.TradeDocument.sub_type "Permalink to this definition")

The subtype of the document. The API returns “” in the case of this not being specified, however we transform this case into None for convenience.

Type:

Optional\[[TradeDocumentSubType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TradeDocumentSubType "alpaca.broker.enums.TradeDocumentSubType")\]

date[#](#alpaca.broker.models.documents.TradeDocument.date "Permalink to this definition")

Date on when this TradeDocument was generated

Type:

date

W8BenDocument[#](#w8bendocument "Permalink to this heading")
------------------------------------------------------------

_class_ alpaca.broker.models.documents.W8BenDocument(_\*_, _country\_citizen: str_, _date: date_, _date\_of\_birth: date_, _full\_name: str_, _ip\_address: Union\[IPv4Address, IPv6Address\]_, _permanent\_address\_city\_state: str_, _permanent\_address\_country: str_, _permanent\_address\_street: str_, _revision: str_, _signer\_full\_name: str_, _timestamp: datetime_, _additional\_conditions: Optional\[str\] \= None_, _foreign\_tax\_id: Optional\[str\] \= None_, _ftin\_not\_required: Optional\[bool\] \= None_, _income\_type: Optional\[str\] \= None_, _mailing\_address\_city\_state: Optional\[str\] \= None_, _mailing\_address\_country: Optional\[str\] \= None_, _mailing\_address\_street: Optional\[str\] \= None_, _paragraph\_number: Optional\[str\] \= None_, _percent\_rate\_withholding: Optional\[str\] \= None_, _reference\_number: Optional\[str\] \= None_, _residency: Optional\[str\] \= None_, _tax\_id\_ssn: Optional\[str\] \= None_)[#](#alpaca.broker.models.documents.W8BenDocument "Permalink to this definition")

Represents the information normally contained in a W8BEN document as fields for convenience if you don’t want to upload a file.

Please see [https://docs.alpaca.markets/docs/international-accounts](https://docs.alpaca.markets/docs/international-accounts) for more information.

TODO: None of the docs or code explain what any of these fields mean. Guessing based on name alone for

all of them; but we really need the docs updated.

additional\_conditions[#](#alpaca.broker.models.documents.W8BenDocument.additional_conditions "Permalink to this definition")

Any additional conditions to specify

Type:

Optional\[str\]

country\_citizen[#](#alpaca.broker.models.documents.W8BenDocument.country_citizen "Permalink to this definition")

The Country that the applicant is a citizen of

Type:

str

date[#](#alpaca.broker.models.documents.W8BenDocument.date "Permalink to this definition")

date signed

Type:

date

date\_of\_birth[#](#alpaca.broker.models.documents.W8BenDocument.date_of_birth "Permalink to this definition")

DOB of applicant

Type:

date

foreign\_tax\_id[#](#alpaca.broker.models.documents.W8BenDocument.foreign_tax_id "Permalink to this definition")

Applicant’s tax id in their home country

Type:

Optional\[str\]

ftin\_not\_required[#](#alpaca.broker.models.documents.W8BenDocument.ftin_not_required "Permalink to this definition")

Required if foreign\_tax\_id and tax\_id\_ssn are empty.

Type:

Optional\[bool\]

full\_name[#](#alpaca.broker.models.documents.W8BenDocument.full_name "Permalink to this definition")

Full name of applicant

Type:

str

income\_type[#](#alpaca.broker.models.documents.W8BenDocument.income_type "Permalink to this definition")

income type of applicant

Type:

Optional\[str\]

ip\_address[#](#alpaca.broker.models.documents.W8BenDocument.ip_address "Permalink to this definition")

ip address of applicant when signed

Type:

IPAddress

mailing\_address\_city\_state[#](#alpaca.broker.models.documents.W8BenDocument.mailing_address_city_state "Permalink to this definition")

mailing city/state of applicant

Type:

Optional\[str\]

mailing\_address\_country[#](#alpaca.broker.models.documents.W8BenDocument.mailing_address_country "Permalink to this definition")

mailing country for applicant

Type:

Optional\[str\]

mailing\_address\_street[#](#alpaca.broker.models.documents.W8BenDocument.mailing_address_street "Permalink to this definition")

mailing street address for applicant

Type:

Optional\[str\]

paragraph\_number[#](#alpaca.broker.models.documents.W8BenDocument.paragraph_number "Permalink to this definition")

TODO: get documentation for this field

Type:

Optional\[str\]

percent\_rate\_withholding[#](#alpaca.broker.models.documents.W8BenDocument.percent_rate_withholding "Permalink to this definition")

TODO: get documentation for this field

Type:

Optional\[str\]

permanent\_address\_city\_state[#](#alpaca.broker.models.documents.W8BenDocument.permanent_address_city_state "Permalink to this definition")

permanent city/state of applicant

Type:

str

permanent\_address\_country[#](#alpaca.broker.models.documents.W8BenDocument.permanent_address_country "Permalink to this definition")

permanent country of residence of applicant

Type:

str

permanent\_address\_street[#](#alpaca.broker.models.documents.W8BenDocument.permanent_address_street "Permalink to this definition")

permanent street address of applicant

Type:

str

reference\_number[#](#alpaca.broker.models.documents.W8BenDocument.reference_number "Permalink to this definition")

TODO: Get documentation for this field

Type:

Optional\[str\]

residency[#](#alpaca.broker.models.documents.W8BenDocument.residency "Permalink to this definition")

Country of residency of applicant TODO: get real documentation for this field. current is just guess based on example

Type:

Optional\[str\]

revision[#](#alpaca.broker.models.documents.W8BenDocument.revision "Permalink to this definition")

Revision of the W8BEN form

Type:

str

signer\_full\_name[#](#alpaca.broker.models.documents.W8BenDocument.signer_full_name "Permalink to this definition")

Full name of signing user

Type:

str

tax\_id\_ssn[#](#alpaca.broker.models.documents.W8BenDocument.tax_id_ssn "Permalink to this definition")

TaxID/SSN of applicant

Type:

Optional\[str\]

timestamp[#](#alpaca.broker.models.documents.W8BenDocument.timestamp "Permalink to this definition")

timestamp when form data was gathered

Type:

datetime

CIPKYCInfo[#](#cipkycinfo "Permalink to this heading")
------------------------------------------------------

_class_ alpaca.broker.models.cip.CIPKYCInfo(_\*_, _id: str_, _risk\_score: Optional\[int\] \= None_, _risk\_level: Optional\[str\] \= None_, _risk\_categories: Optional\[List\[str\]\] \= None_, _applicant\_name: Optional\[str\] \= None_, _email\_address: Optional\[str\] \= None_, _nationality: Optional\[str\] \= None_, _date\_of\_birth: Optional\[datetime\] \= None_, _address: Optional\[str\] \= None_, _postal\_code: Optional\[str\] \= None_, _country\_of\_residency: Optional\[str\] \= None_, _kyc\_completed\_at: Optional\[datetime\] \= None_, _ip\_address: Optional\[str\] \= None_, _check\_initiated\_at: Optional\[datetime\] \= None_, _check\_completed\_at: Optional\[datetime\] \= None_, _approval\_status: Optional\[[CIPApprovalStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPApprovalStatus "alpaca.broker.enums.CIPApprovalStatus")\] \= None_, _approved\_by: Optional\[str\] \= None_, _approved\_reason: Optional\[str\] \= None_, _approved\_at: Optional\[datetime\] \= None_)[#](#alpaca.broker.models.cip.CIPKYCInfo "Permalink to this definition")

Represents Know Your Customer (KYC) info for a CIPInfo

id[#](#alpaca.broker.models.cip.CIPKYCInfo.id "Permalink to this definition")

Your internal ID of check

Type:

str

risk\_score[#](#alpaca.broker.models.cip.CIPKYCInfo.risk_score "Permalink to this definition")

Overall risk score returned by KYC provider or assessed

Type:

Optional\[int\]

risk\_level[#](#alpaca.broker.models.cip.CIPKYCInfo.risk_level "Permalink to this definition")

Overall risk level returned by KYC provider or assessed

Type:

Optional\[str\]

risk\_categories[#](#alpaca.broker.models.cip.CIPKYCInfo.risk_categories "Permalink to this definition")

The list of risk categories returned by the KYC provider or assessed

Type:

Optional\[List\[str\]\]

applicant\_name[#](#alpaca.broker.models.cip.CIPKYCInfo.applicant_name "Permalink to this definition")

Given and family name of applicant

Type:

Optional\[str\]

email\_address[#](#alpaca.broker.models.cip.CIPKYCInfo.email_address "Permalink to this definition")

email address of applicant

Type:

Optional\[str\]

nationality[#](#alpaca.broker.models.cip.CIPKYCInfo.nationality "Permalink to this definition")

nationality of applicant

Type:

Optional\[str\]

date\_of\_birth[#](#alpaca.broker.models.cip.CIPKYCInfo.date_of_birth "Permalink to this definition")

DOB of applicant

Type:

Optional\[datetime\]

address[#](#alpaca.broker.models.cip.CIPKYCInfo.address "Permalink to this definition")

Concatenated street address, city, state and country of applicant

Type:

Optional\[str\]

postal\_code[#](#alpaca.broker.models.cip.CIPKYCInfo.postal_code "Permalink to this definition")

postal code for address field

Type:

Optional\[str\]

country\_of\_residency[#](#alpaca.broker.models.cip.CIPKYCInfo.country_of_residency "Permalink to this definition")

country for address field

Type:

Optional\[str\]

kyc\_completed\_at[#](#alpaca.broker.models.cip.CIPKYCInfo.kyc_completed_at "Permalink to this definition")

Datetime that KYC check was completed at

Type:

Optional\[datetime\]

ip\_address[#](#alpaca.broker.models.cip.CIPKYCInfo.ip_address "Permalink to this definition")

ip address of applicant at time of KYC check

Type:

Optional\[str\]

check\_initiated\_at[#](#alpaca.broker.models.cip.CIPKYCInfo.check_initiated_at "Permalink to this definition")

start datetime of KYC check

Type:

Optional\[datetime\]

check\_completed\_at[#](#alpaca.broker.models.cip.CIPKYCInfo.check_completed_at "Permalink to this definition")

completion datetime of KYC check

Type:

Optional\[datetime\]

approval\_status[#](#alpaca.broker.models.cip.CIPKYCInfo.approval_status "Permalink to this definition")

Approval status of KYC check

Type:

Optional\[[CIPApprovalStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPApprovalStatus "alpaca.broker.enums.CIPApprovalStatus")\]

approved\_by[#](#alpaca.broker.models.cip.CIPKYCInfo.approved_by "Permalink to this definition")

Identifier of who approved KYC check

Type:

Optional\[str\]

approved\_reason[#](#alpaca.broker.models.cip.CIPKYCInfo.approved_reason "Permalink to this definition")

Reason for approving this KYC check

Type:

Optional\[str\]

approved\_at[#](#alpaca.broker.models.cip.CIPKYCInfo.approved_at "Permalink to this definition")

Datetime that this KYC check was approved

Type:

Optional\[datetime\]

CIPDocument[#](#cipdocument "Permalink to this heading")
--------------------------------------------------------

_class_ alpaca.broker.models.cip.CIPDocument(_\*_, _id: str_, _result: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _status: Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\] \= None_, _created\_at: Optional\[datetime\] \= None_, _date\_of\_birth: Optional\[datetime\] \= None_, _date\_of\_expiry: Optional\[datetime\] \= None_, _document\_numbers: Optional\[List\[str\]\] \= None_, _document\_type: Optional\[str\] \= None_, _first\_name: Optional\[str\] \= None_, _last\_name: Optional\[str\] \= None_, _gender: Optional\[str\] \= None_, _issuing\_country: Optional\[str\] \= None_, _nationality: Optional\[str\] \= None_, _age\_validation: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _compromised\_document: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _police\_record: Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\] \= None_, _data\_comparison: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _data\_comparison\_breakdown: Optional\[str\] \= None_, _image\_integrity: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _image\_integrity\_breakdown: Optional\[str\] \= None_, _visual\_authenticity: Optional\[str\] \= None_)[#](#alpaca.broker.models.cip.CIPDocument "Permalink to this definition")

Represents results of checking a document for CIPInfo

id[#](#alpaca.broker.models.cip.CIPDocument.id "Permalink to this definition")

Your internal ID of check

Type:

str

result[#](#alpaca.broker.models.cip.CIPDocument.result "Permalink to this definition")

Overall result of specific check

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

status[#](#alpaca.broker.models.cip.CIPDocument.status "Permalink to this definition")

Overall status of specific check

Type:

Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\]

created\_at[#](#alpaca.broker.models.cip.CIPDocument.created_at "Permalink to this definition")

Datetime for when this check was done

Type:

Optional\[datetime\]

date\_of\_birth[#](#alpaca.broker.models.cip.CIPDocument.date_of_birth "Permalink to this definition")

DOB for applicant if found on document

Type:

Optional\[datetime\]

date\_of\_expiry[#](#alpaca.broker.models.cip.CIPDocument.date_of_expiry "Permalink to this definition")

date of expiry for the checked document

Type:

Optional\[datetime\]

document\_numbers[#](#alpaca.broker.models.cip.CIPDocument.document_numbers "Permalink to this definition")

Number of the document that was checked

Type:

Optional\[List\[str\]\]

document\_type[#](#alpaca.broker.models.cip.CIPDocument.document_type "Permalink to this definition")

Type of the document that was checked

Type:

Optional\[str\]

first\_name[#](#alpaca.broker.models.cip.CIPDocument.first_name "Permalink to this definition")

First name extracted from the document

Type:

Optional\[str\]

last\_name[#](#alpaca.broker.models.cip.CIPDocument.last_name "Permalink to this definition")

Last name extracted from the document

Type:

Optional\[str\]

gender[#](#alpaca.broker.models.cip.CIPDocument.gender "Permalink to this definition")

Gender info extracted from the document

Type:

Optional\[str\]

issuing\_country[#](#alpaca.broker.models.cip.CIPDocument.issuing_country "Permalink to this definition")

Country for which issued the document

Type:

Optional\[str\]

nationality[#](#alpaca.broker.models.cip.CIPDocument.nationality "Permalink to this definition")

Nationality extracted from the document

Type:

Optional\[str\]

age\_validation[#](#alpaca.broker.models.cip.CIPDocument.age_validation "Permalink to this definition")

Result of checks on whether the age calculated from the document’s date of birth data point is greater than or equal to the minimum accepted age set at account level

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

compromised\_document[#](#alpaca.broker.models.cip.CIPDocument.compromised_document "Permalink to this definition")

Result of check on whether the image of the document has been found in our internal database of compromised documents

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

police\_record[#](#alpaca.broker.models.cip.CIPDocument.police_record "Permalink to this definition")

Result of check on whether the document has been identified as lost, stolen or otherwise compromised

Type:

Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\]

data\_comparison[#](#alpaca.broker.models.cip.CIPDocument.data_comparison "Permalink to this definition")

Result of check on whether data on the document is consistent with data provided when creating an applicant through the API

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

data\_comparison\_breakdown[#](#alpaca.broker.models.cip.CIPDocument.data_comparison_breakdown "Permalink to this definition")

json object representing the results of the various sub-checks done when calculating the result on data\_comparison. Example: {“date\_of\_birth”: “clear”, “date\_of\_expiry”: “clear” “document\_numbers”: “clear”, “document\_type”: “clear”, “first\_name”: “clear”, “gender”: “clear”, “issuing\_country”: “clear”, “last\_name”: “clear”}

Type:

Optional\[str\]

image\_integrity[#](#alpaca.broker.models.cip.CIPDocument.image_integrity "Permalink to this definition")

Result of checks on whether the document was of sufficient quality to verify

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

image\_integrity\_breakdown[#](#alpaca.broker.models.cip.CIPDocument.image_integrity_breakdown "Permalink to this definition")

json object representing the results of the various sub-checks done when calculating the result on image\_integrity. Example: example: {“colour\_picture”: “clear”, “conclusive\_document\_quality”: “clear”, “image\_quality”: “clear”, “supported\_document”: “clear”}

Type:

Optional\[str\]

visual\_authenticity[#](#alpaca.broker.models.cip.CIPDocument.visual_authenticity "Permalink to this definition")

json object representing the the various sub-checks done when determening whether visual (non-textual) elements are correct given the document type. Example: { “digital\_tampering”: “clear”, “face\_detection”: “clear”, “fonts”: “clear”, “original\_document\_present”: “clear”, “picture\_face\_integrity”: “clear”, “security\_features”: “clear”, “template”: “clear”}

Type:

Optional\[str\]

CIPPhoto[#](#cipphoto "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.broker.models.cip.CIPPhoto(_\*_, _id: str_, _result: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _status: Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\] \= None_, _created\_at: Optional\[datetime\] \= None_, _face\_comparision: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _face\_comparison\_breakdown: Optional\[str\] \= None_, _image\_integrity: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _image\_integrity\_breakdown: Optional\[str\] \= None_, _visual\_authenticity: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _visual\_authenticity\_breakdown: Optional\[str\] \= None_)[#](#alpaca.broker.models.cip.CIPPhoto "Permalink to this definition")

Represents the results of checking a Photo for CIPInfo

id[#](#alpaca.broker.models.cip.CIPPhoto.id "Permalink to this definition")

Your internal ID of check

Type:

str

result[#](#alpaca.broker.models.cip.CIPPhoto.result "Permalink to this definition")

Overall result of check

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

status[#](#alpaca.broker.models.cip.CIPPhoto.status "Permalink to this definition")

Overall status of check

Type:

Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\]

created\_at[#](#alpaca.broker.models.cip.CIPPhoto.created_at "Permalink to this definition")

datetime of when check happened

Type:

Optional\[datetime\]

face\_comparision[#](#alpaca.broker.models.cip.CIPPhoto.face_comparision "Permalink to this definition")

Checks whether the face in the document matches the face in the live photo

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

face\_comparison\_breakdown[#](#alpaca.broker.models.cip.CIPPhoto.face_comparison_breakdown "Permalink to this definition")

a json object representing the breakdown of sub-checks done in face\_comparison. Example: {“face\_match”:{“result”: “clear”,“properties”:{“score”: “80”}}}

Type:

Optional\[str\]

image\_integrity[#](#alpaca.broker.models.cip.CIPPhoto.image_integrity "Permalink to this definition")

Checks whether the quality and integrity of the uploaded files were sufficient to perform a face comparison

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

image\_integrity\_breakdown[#](#alpaca.broker.models.cip.CIPPhoto.image_integrity_breakdown "Permalink to this definition")

a json object representing the breakdown of sub-checks done in image\_integrity. Example {“face\_detected”:{“result”: “clear”},“source\_integrity”: {“result”: “clear”}}

Type:

Optional\[str\]

visual\_authenticity[#](#alpaca.broker.models.cip.CIPPhoto.visual_authenticity "Permalink to this definition")

Checks whether the person in the live photo is real (not a spoof)

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

visual\_authenticity\_breakdown[#](#alpaca.broker.models.cip.CIPPhoto.visual_authenticity_breakdown "Permalink to this definition")

a json object representing the breakdown of sub-checks don in visual\_authenticity. Example {“spoofing\_detection”: {“result”: “clear”,“properties”: {“score”: “26”}}}}

Type:

Optional\[str\]

CIPIdentity[#](#cipidentity "Permalink to this heading")
--------------------------------------------------------

_class_ alpaca.broker.models.cip.CIPIdentity(_\*_, _id: str_, _result: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _status: Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\] \= None_, _created\_at: Optional\[datetime\] \= None_, _matched\_address: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _matched\_addresses: Optional\[str\] \= None_, _sources: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _sources\_breakdown: Optional\[str\] \= None_, _address: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _address\_breakdown: Optional\[str\] \= None_, _date\_of\_birth: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _date\_of\_birth\_breakdown: Optional\[str\] \= None_, _tax\_id: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _tax\_id\_breakdown: Optional\[str\] \= None_)[#](#alpaca.broker.models.cip.CIPIdentity "Permalink to this definition")

Represents the results of running an identity check for a CIPInfo

id[#](#alpaca.broker.models.cip.CIPIdentity.id "Permalink to this definition")

Your internal ID of check

Type:

str

result[#](#alpaca.broker.models.cip.CIPIdentity.result "Permalink to this definition")

Overall result of check

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

status[#](#alpaca.broker.models.cip.CIPIdentity.status "Permalink to this definition")

Overall status of check

Type:

Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\]

created\_at[#](#alpaca.broker.models.cip.CIPIdentity.created_at "Permalink to this definition")

datetime when identity check happened

Type:

Optional\[datetime\]

matched\_address[#](#alpaca.broker.models.cip.CIPIdentity.matched_address "Permalink to this definition")

Represents of the address matched for the applicant

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

matched\_addresses[#](#alpaca.broker.models.cip.CIPIdentity.matched_addresses "Permalink to this definition")

a json object representing the results of the check done in matched\_address Example: \[{“id”: “19099121”,“match\_types”:\[“credit\_agencies”,“voting\_register”\]}\]

Type:

Optional\[str\]

sources[#](#alpaca.broker.models.cip.CIPIdentity.sources "Permalink to this definition")

Shows the total number of sources found for applicant’s identity. (TODO: What? This doesnt make any sense its a CIPResult not a number but that’s whats in the docs)

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

sources\_breakdown[#](#alpaca.broker.models.cip.CIPIdentity.sources_breakdown "Permalink to this definition")

a json object representing the breakdown of sources field. For example: {“total\_sources”: {“result”: “clear”,“properties”: {“total\_number\_of\_sources”: “3”}}}

Type:

Optional\[str\]

address[#](#alpaca.broker.models.cip.CIPIdentity.address "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

address\_breakdown[#](#alpaca.broker.models.cip.CIPIdentity.address_breakdown "Permalink to this definition")

a json object representing the breakdown of the address field. For example: {“credit\_agencies”: {“result”: “clear”,“properties”:{“number\_of\_matches”:“1”}}

Type:

Optional\[str\]

date\_of\_birth[#](#alpaca.broker.models.cip.CIPIdentity.date_of_birth "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

date\_of\_birth\_breakdown[#](#alpaca.broker.models.cip.CIPIdentity.date_of_birth_breakdown "Permalink to this definition")

a json object representing the breakdown of the date\_of\_birth field. For example: example: {“credit\_agencies”:{“result”: “clear”,“properties”: {“number\_of\_matches”: “1”}}

Type:

Optional\[str\]

tax\_id[#](#alpaca.broker.models.cip.CIPIdentity.tax_id "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

tax\_id\_breakdown[#](#alpaca.broker.models.cip.CIPIdentity.tax_id_breakdown "Permalink to this definition")

a json object representing the breakdown of the tax\_id field

Type:

Optional\[str\]

CIPWatchlist[#](#cipwatchlist "Permalink to this heading")
----------------------------------------------------------

_class_ alpaca.broker.models.cip.CIPWatchlist(_\*_, _id: str_, _result: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _status: Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\] \= None_, _created\_at: Optional\[datetime\] \= None_, _records: Optional\[str\] \= None_, _politically\_exposed\_person: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _sanction: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _adverse\_media: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_, _monitored\_lists: Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\] \= None_)[#](#alpaca.broker.models.cip.CIPWatchlist "Permalink to this definition")

Represents the result of checking to see if the applicant is in any watchlists for a CIPInfo

TODO: We’re missing almost entirely documentation in prod for this as well as even internal documentation

no clue what these fields are supposed to be or if they’re even close to correct.

id[#](#alpaca.broker.models.cip.CIPWatchlist.id "Permalink to this definition")

Your internal ID of check

Type:

str

result[#](#alpaca.broker.models.cip.CIPWatchlist.result "Permalink to this definition")

Overall result of specific check

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

status[#](#alpaca.broker.models.cip.CIPWatchlist.status "Permalink to this definition")

Overall status of specific check

Type:

Optional\[[CIPStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPStatus "alpaca.broker.enums.CIPStatus")\]

created\_at[#](#alpaca.broker.models.cip.CIPWatchlist.created_at "Permalink to this definition")

datetime when check happened

Type:

Optional\[datetime\]

records[#](#alpaca.broker.models.cip.CIPWatchlist.records "Permalink to this definition")

a json object. Example \[{“text”: “Record info”}\]

Type:

Optional\[str\]

politically\_exposed\_person[#](#alpaca.broker.models.cip.CIPWatchlist.politically_exposed_person "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

sanction[#](#alpaca.broker.models.cip.CIPWatchlist.sanction "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

adverse\_media[#](#alpaca.broker.models.cip.CIPWatchlist.adverse_media "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

monitored\_lists[#](#alpaca.broker.models.cip.CIPWatchlist.monitored_lists "Permalink to this definition")

Result if it was cleared against a data source

Type:

Optional\[[CIPResult](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPResult "alpaca.broker.enums.CIPResult")\]

CIPInfo[#](#cipinfo "Permalink to this heading")
------------------------------------------------

_class_ alpaca.broker.models.cip.CIPInfo(_\*args_, _id: UUID_, _account\_id: UUID_, _provider\_name: List\[[CIPProvider](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPProvider "alpaca.broker.enums.CIPProvider")\]_, _created\_at: datetime_, _updated\_at: datetime_, _kyc: Optional\[[CIPKYCInfo](#alpaca.broker.models.cip.CIPKYCInfo "alpaca.broker.models.cip.CIPKYCInfo")\] \= None_, _document: Optional\[[CIPDocument](#alpaca.broker.models.cip.CIPDocument "alpaca.broker.models.cip.CIPDocument")\] \= None_, _photo: Optional\[[CIPPhoto](#alpaca.broker.models.cip.CIPPhoto "alpaca.broker.models.cip.CIPPhoto")\] \= None_, _identity: Optional\[[CIPIdentity](#alpaca.broker.models.cip.CIPIdentity "alpaca.broker.models.cip.CIPIdentity")\] \= None_, _watchlist: Optional\[[CIPWatchlist](#alpaca.broker.models.cip.CIPWatchlist "alpaca.broker.models.cip.CIPWatchlist")\] \= None_)[#](#alpaca.broker.models.cip.CIPInfo "Permalink to this definition")

The Customer Identification Program (CIP) API allows you to submit the CIP results received from your KYC provider.

This model is how to represent that information when talking to Alpaca

Parameters:

*   **id** (_UUID_) – ID of this CIPInfo
    
*   **account\_id** (_UUID_) – UUID of the Account instance this CIPInfo is for
    
*   **provider\_name** (_List__\[_[_CIPProvider_](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.CIPProvider "alpaca.broker.enums.CIPProvider")_\]_) – List of KYC providers this information came from
    
*   **created\_at** (_datetime_) – date and time this CIPInfo was first uploaded to Alpaca
    
*   **updated\_at** (_datetime_) – date and time that this CIPInfo was last update
    
*   **kyc** (_Optional__\[_[_CIPKYCInfo_](#alpaca.broker.models.cip.CIPKYCInfo "alpaca.broker.models.cip.CIPKYCInfo")_\]_) – KYC info for this Account if any
    
*   **document** (_Optional__\[_[_CIPDocument_](#alpaca.broker.models.cip.CIPDocument "alpaca.broker.models.cip.CIPDocument")_\]_) – Any CIP documents uploaded for this Account
    
*   **photo** (_Optional__\[_[_CIPPhoto_](#alpaca.broker.models.cip.CIPPhoto "alpaca.broker.models.cip.CIPPhoto")_\]_) – Any photos attached for CIP
    
*   **identity** (_Optional__\[_[_CIPIdentity_](#alpaca.broker.models.cip.CIPIdentity "alpaca.broker.models.cip.CIPIdentity")_\]_) – Any CIP Identity information
    
*   **watchlist** (_Optional__\[_[_CIPWatchlist_](#alpaca.broker.models.cip.CIPWatchlist "alpaca.broker.models.cip.CIPWatchlist")_\]_) – Any CIP watchlist information
    

ACHRelationship[#](#achrelationship "Permalink to this heading")
----------------------------------------------------------------

_class_ alpaca.broker.models.funding.ACHRelationship(_\*_, _id: UUID_, _account\_id: UUID_, _created\_at: datetime_, _updated\_at: datetime_, _status: [ACHRelationshipStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ACHRelationshipStatus "alpaca.broker.enums.ACHRelationshipStatus")_, _account\_owner\_name: str_, _bank\_account\_type: [BankAccountType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.BankAccountType "alpaca.broker.enums.BankAccountType")_, _bank\_account\_number: str_, _bank\_routing\_number: str_, _nickname: Optional\[str\] \= None_, _processor\_token: Optional\[str\] \= None_)[#](#alpaca.broker.models.funding.ACHRelationship "Permalink to this definition")

id[#](#alpaca.broker.models.funding.ACHRelationship.id "Permalink to this definition")

ID of Relationship

Type:

UUID

account\_id[#](#alpaca.broker.models.funding.ACHRelationship.account_id "Permalink to this definition")

ID of the Account this ACHRelationship is tied to

Type:

UUID

created\_at[#](#alpaca.broker.models.funding.ACHRelationship.created_at "Permalink to this definition")

Date and time this relationship was created

Type:

datetime

updated\_at[#](#alpaca.broker.models.funding.ACHRelationship.updated_at "Permalink to this definition")

Date and time of when this relationship was last updated

Type:

datetime

status[#](#alpaca.broker.models.funding.ACHRelationship.status "Permalink to this definition")

Current status of the relationship

Type:

[ACHRelationshipStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.ACHRelationshipStatus "alpaca.broker.enums.ACHRelationshipStatus")

account\_owner\_name[#](#alpaca.broker.models.funding.ACHRelationship.account_owner_name "Permalink to this definition")

Full name of the account owner

Type:

str

bank\_account\_type[#](#alpaca.broker.models.funding.ACHRelationship.bank_account_type "Permalink to this definition")

The kind of bank account this relationship points to

Type:

[BankAccountType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.BankAccountType "alpaca.broker.enums.BankAccountType")

bank\_account\_number[#](#alpaca.broker.models.funding.ACHRelationship.bank_account_number "Permalink to this definition")

The number of bank account that the relationship points to

Type:

str

bank\_routing\_number[#](#alpaca.broker.models.funding.ACHRelationship.bank_routing_number "Permalink to this definition")

Routing number for the bank account

Type:

str

nickname[#](#alpaca.broker.models.funding.ACHRelationship.nickname "Permalink to this definition")

User provided name for account

Type:

str

processor\_token[#](#alpaca.broker.models.funding.ACHRelationship.processor_token "Permalink to this definition")

If you are using Plaid, then this is a Plaid processor token.

Type:

Optional\[str\]

Bank[#](#bank "Permalink to this heading")
------------------------------------------

_class_ alpaca.broker.models.funding.Bank(_\*_, _id: UUID_, _account\_id: UUID_, _created\_at: datetime_, _updated\_at: datetime_, _name: str_, _status: [BankStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.BankStatus "alpaca.broker.enums.BankStatus")_, _country: str_, _state\_province: str_, _postal\_code: str_, _city: str_, _street\_address: str_, _account\_number: str_, _bank\_code: str_, _bank\_code\_type: [IdentifierType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.IdentifierType "alpaca.broker.enums.IdentifierType")_)[#](#alpaca.broker.models.funding.Bank "Permalink to this definition")

id[#](#alpaca.broker.models.funding.Bank.id "Permalink to this definition")

ID of Bank.

Type:

UUID

account\_id[#](#alpaca.broker.models.funding.Bank.account_id "Permalink to this definition")

ID of the Account this Bank is tied to.

Type:

UUID

created\_at[#](#alpaca.broker.models.funding.Bank.created_at "Permalink to this definition")

Date and time this Bank was created.

Type:

datetime

updated\_at[#](#alpaca.broker.models.funding.Bank.updated_at "Permalink to this definition")

Date and time of when this Bank was last updated.

Type:

datetime

name[#](#alpaca.broker.models.funding.Bank.name "Permalink to this definition")

Name of the bank.

Type:

str

status[#](#alpaca.broker.models.funding.Bank.status "Permalink to this definition")

The status of the bank connection.

Type:

[BankStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.BankStatus "alpaca.broker.enums.BankStatus")

country[#](#alpaca.broker.models.funding.Bank.country "Permalink to this definition")

Country where bank account is located.

Type:

str

state\_province[#](#alpaca.broker.models.funding.Bank.state_province "Permalink to this definition")

State/Province where bank is located.

Type:

str

postal\_code[#](#alpaca.broker.models.funding.Bank.postal_code "Permalink to this definition")

Postal code where bank is located.

Type:

str

city[#](#alpaca.broker.models.funding.Bank.city "Permalink to this definition")

City where bank is located.

Type:

str

street\_address[#](#alpaca.broker.models.funding.Bank.street_address "Permalink to this definition")

Street address where bank is located.

Type:

str

account\_number[#](#alpaca.broker.models.funding.Bank.account_number "Permalink to this definition")

The bank account number.

Type:

str

bank\_code[#](#alpaca.broker.models.funding.Bank.bank_code "Permalink to this definition")

The bank account code.

Type:

str

bank\_code\_type[#](#alpaca.broker.models.funding.Bank.bank_code_type "Permalink to this definition")

The bank identifier.

Type:

[IdentifierType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.IdentifierType "alpaca.broker.enums.IdentifierType")

Transfer[#](#transfer "Permalink to this heading")
--------------------------------------------------

_class_ alpaca.broker.models.funding.Transfer(_\*_, _id: UUID_, _account\_id: UUID_, _created\_at: datetime_, _updated\_at: Optional\[datetime\] \= None_, _expires\_at: Optional\[datetime\] \= None_, _relationship\_id: Optional\[UUID\] \= None_, _bank\_id: Optional\[UUID\] \= None_, _amount: str_, _type: [TransferType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferType "alpaca.broker.enums.TransferType")_, _status: [TransferStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferStatus "alpaca.broker.enums.TransferStatus")_, _direction: [TransferDirection](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferDirection "alpaca.broker.enums.TransferDirection")_, _reason: Optional\[str\] \= None_, _requested\_amount: Optional\[str\] \= None_, _fee: Optional\[str\] \= None_, _fee\_payment\_method: Optional\[[FeePaymentMethod](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.FeePaymentMethod "alpaca.broker.enums.FeePaymentMethod")\] \= None_, _additional\_information: Optional\[str\] \= None_)[#](#alpaca.broker.models.funding.Transfer "Permalink to this definition")

id[#](#alpaca.broker.models.funding.Transfer.id "Permalink to this definition")

ID of Transfer.

Type:

UUID

account\_id[#](#alpaca.broker.models.funding.Transfer.account_id "Permalink to this definition")

ID of the Account this Transfer is tied to.

Type:

UUID

created\_at[#](#alpaca.broker.models.funding.Transfer.created_at "Permalink to this definition")

Date and time when this Transfer was created.

Type:

datetime

updated\_at[#](#alpaca.broker.models.funding.Transfer.updated_at "Permalink to this definition")

Date and time of when this Transfer was last updated.

Type:

datetime

expires\_at[#](#alpaca.broker.models.funding.Transfer.expires_at "Permalink to this definition")

Date and time of when this Transfer will expire.

Type:

datetime

relationship\_id[#](#alpaca.broker.models.funding.Transfer.relationship_id "Permalink to this definition")

ID of the funding relationship used to make the transfer.

Type:

UUID

amount[#](#alpaca.broker.models.funding.Transfer.amount "Permalink to this definition")

The amount the recipient will receive after any applicable fees are deducted.

Type:

str

type[#](#alpaca.broker.models.funding.Transfer.type "Permalink to this definition")

The type of transfer.

Type:

[TransferType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferType "alpaca.broker.enums.TransferType")

status[#](#alpaca.broker.models.funding.Transfer.status "Permalink to this definition")

The status of the transfer.

Type:

[TransferStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferStatus "alpaca.broker.enums.TransferStatus")

direction[#](#alpaca.broker.models.funding.Transfer.direction "Permalink to this definition")

The direction of the transfer.

Type:

[TransferDirection](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.TransferDirection "alpaca.broker.enums.TransferDirection")

reason[#](#alpaca.broker.models.funding.Transfer.reason "Permalink to this definition")

Reasoning associated with the current status.

Type:

Optional\[str\]

requested\_amount[#](#alpaca.broker.models.funding.Transfer.requested_amount "Permalink to this definition")

Amount entered upon creation of a transfer entity.

Type:

Optional\[str\]

fee[#](#alpaca.broker.models.funding.Transfer.fee "Permalink to this definition")

Dollar amount of any applicable fees.

Type:

Optional\[str\]

fee\_payment\_method[#](#alpaca.broker.models.funding.Transfer.fee_payment_method "Permalink to this definition")

Denotes how any applicable fees will be paid.

Type:

Optional\[[FeePaymentMethod](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.FeePaymentMethod "alpaca.broker.enums.FeePaymentMethod")\]

additional\_information[#](#alpaca.broker.models.funding.Transfer.additional_information "Permalink to this definition")

Additional information provided with wire transfers.

Type:

Optional\[str\]

Journal[#](#journal "Permalink to this heading")
------------------------------------------------

_class_ alpaca.broker.models.journals.Journal(_\*_, _id: UUID_, _to\_account: UUID_, _from\_account: UUID_, _entry\_type: [JournalEntryType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalEntryType "alpaca.broker.enums.JournalEntryType")_, _status: [JournalStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalStatus "alpaca.broker.enums.JournalStatus")_, _net\_amount: Optional\[float\] \= None_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _price: Optional\[float\] \= None_, _description: Optional\[str\] \= None_, _settle\_date: Optional\[date\] \= None_, _system\_date: Optional\[date\] \= None_, _transmitter\_name: Optional\[str\] \= None_, _transmitter\_account\_number: Optional\[str\] \= None_, _transmitter\_address: Optional\[str\] \= None_, _transmitter\_financial\_institution: Optional\[str\] \= None_, _transmitter\_timestamp: Optional\[str\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_)[#](#alpaca.broker.models.journals.Journal "Permalink to this definition")

Represents a transfer of cash or securities from one account to another.

There are two types of journals Cash Journals and Security Journals.

**Travel Rule** In an effort to fight the criminal financial transactions, FinCEN enacted the Travel Rule that applies to fund transfers of more than $3,000. When you use Journal API to bundle a bulk of transfers for the end-users, you will need to tell about the breakdown and each transmitter information using the optional fields of the POST request.

Learn more about journals here: [https://alpaca.markets/docs/api-references/broker-api/journals/](https://alpaca.markets/docs/api-references/broker-api/journals/)

id[#](#alpaca.broker.models.journals.Journal.id "Permalink to this definition")

The journal ID

Type:

UUID

to\_account[#](#alpaca.broker.models.journals.Journal.to_account "Permalink to this definition")

The account ID that received the journal.

Type:

UUID

from\_account[#](#alpaca.broker.models.journals.Journal.from_account "Permalink to this definition")

The account ID that initiates the journal.

Type:

UUID

entry\_type[#](#alpaca.broker.models.journals.Journal.entry_type "Permalink to this definition")

Whether the journal is a cash or security journal.

Type:

[JournalEntryType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalEntryType "alpaca.broker.enums.JournalEntryType")

status[#](#alpaca.broker.models.journals.Journal.status "Permalink to this definition")

The lifecycle status of the journal.

Type:

[JournalStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalStatus "alpaca.broker.enums.JournalStatus")

symbol[#](#alpaca.broker.models.journals.Journal.symbol "Permalink to this definition")

For security journals, the symbol identifier of the security being journaled.

Type:

Optional\[str\]

qty[#](#alpaca.broker.models.journals.Journal.qty "Permalink to this definition")

For security journals, the quantity of the security being journaled.

Type:

Optional\[float\]

price[#](#alpaca.broker.models.journals.Journal.price "Permalink to this definition")

For security journals, the price at which the security is being journaled at.

Type:

Optional\[float\]

net\_amount[#](#alpaca.broker.models.journals.Journal.net_amount "Permalink to this definition")

For cash journals, the total cash amount journaled

Type:

Optional\[float\]

description[#](#alpaca.broker.models.journals.Journal.description "Permalink to this definition")

Journal description. It can include fixtures for sandbox API.

Type:

Optional\[str\]

settle\_date[#](#alpaca.broker.models.journals.Journal.settle_date "Permalink to this definition")

Type:

Optional\[date\]

system\_date[#](#alpaca.broker.models.journals.Journal.system_date "Permalink to this definition")

Type:

Optional\[date\]

transmitter\_name[#](#alpaca.broker.models.journals.Journal.transmitter_name "Permalink to this definition")

For cash journals, travel rule related name info.

Type:

Optional\[str\]

transmitter\_account\_number[#](#alpaca.broker.models.journals.Journal.transmitter_account_number "Permalink to this definition")

For cash journals, travel rule account number info.

Type:

Optional\[str\]

transmitter\_address[#](#alpaca.broker.models.journals.Journal.transmitter_address "Permalink to this definition")

For cash journals, travel rule related address info.

Type:

Optional\[str\]

transmitter\_financial\_institution[#](#alpaca.broker.models.journals.Journal.transmitter_financial_institution "Permalink to this definition")

For cash journals, travel rule related institution info.

Type:

Optional\[str\]

transmitter\_timestamp[#](#alpaca.broker.models.journals.Journal.transmitter_timestamp "Permalink to this definition")

For cash journals, travel rule related timestamp info.

Type:

Optional\[str\]

BatchJournalResponse[#](#batchjournalresponse "Permalink to this heading")
--------------------------------------------------------------------------

_class_ alpaca.broker.models.journals.BatchJournalResponse(_\*_, _id: UUID_, _to\_account: UUID_, _from\_account: UUID_, _entry\_type: [JournalEntryType](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalEntryType "alpaca.broker.enums.JournalEntryType")_, _status: [JournalStatus](https://alpaca.markets/sdks/python/api_reference/broker/enums.html#alpaca.broker.enums.JournalStatus "alpaca.broker.enums.JournalStatus")_, _net\_amount: Optional\[float\] \= None_, _symbol: Optional\[str\] \= None_, _qty: Optional\[float\] \= None_, _price: Optional\[float\] \= None_, _description: Optional\[str\] \= None_, _settle\_date: Optional\[date\] \= None_, _system\_date: Optional\[date\] \= None_, _transmitter\_name: Optional\[str\] \= None_, _transmitter\_account\_number: Optional\[str\] \= None_, _transmitter\_address: Optional\[str\] \= None_, _transmitter\_financial\_institution: Optional\[str\] \= None_, _transmitter\_timestamp: Optional\[str\] \= None_, _currency: Optional\[SupportedCurrencies\] \= None_, _error\_message: Optional\[str\] \= None_)[#](#alpaca.broker.models.journals.BatchJournalResponse "Permalink to this definition")

Represents a journal response from a batch journal request.

error\_message[#](#alpaca.broker.models.journals.BatchJournalResponse.error_message "Permalink to this definition")

An message that contains error details for failed journals.

Type:

Optional\[str\]</content>
</page>

<page>
  <title>Email Protection | Cloudflare</title>
  <url>https://alpaca.markets/cdn-cgi/l/email-protection</url>
  <content>Please enable cookies.

You are unable to access this email address alpaca.markets
----------------------------------------------------------

The website from which you got to this page is protected by Cloudflare. Email addresses on that page have been hidden in order to keep them from being accessed by malicious bots. **You must enable Javascript in your browser in order to decode the e-mail address**.

If you have a website and are interested in protecting it in a similar way, you can [sign up for Cloudflare](https://www.cloudflare.com/sign-up?utm_source=email_protection).

*   [How does Cloudflare protect email addresses on website from spammers?](https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-)
*   [Can I sign up for Cloudflare?](https://support.cloudflare.com/hc/en-us/categories/200275218-Getting-Started)

Cloudflare Ray ID: **90f7704e1da57446** • Your IP: 72.252.120.68 • Performance & security by [Cloudflare](https://www.cloudflare.com/5xx-error-landing)</content>
</page>