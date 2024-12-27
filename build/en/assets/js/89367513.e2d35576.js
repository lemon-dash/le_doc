"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8145],{6046:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"time-forcasting/windpower","title":"windpower","description":"\u98ce\u673a\u529f\u7387\u9884\u6d4b","source":"@site/docs/time-forcasting/windpower.md","sourceDirName":"time-forcasting","slug":"/time-forcasting/windpower","permalink":"/en/docs/time-forcasting/windpower","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"precipitation","permalink":"/en/docs/time-forcasting/precipitation"}}');var s=r(4848),i=r(8453);const a={},o=void 0,p={},l=[{value:"\u98ce\u673a\u529f\u7387\u9884\u6d4b",id:"\u98ce\u673a\u529f\u7387\u9884\u6d4b",level:2},{value:"LSTM\u8bad\u7ec3",id:"1",level:4}];function c(e){const n={code:"code",h2:"h2",h4:"h4",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"\u98ce\u673a\u529f\u7387\u9884\u6d4b",children:"\u98ce\u673a\u529f\u7387\u9884\u6d4b"}),"\n",(0,s.jsx)(n.p,{children:"by\u5f20\u6668\u5149"}),"\n",(0,s.jsx)(n.p,{children:"CEEMDAN\u5206\u89e3"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-py",children:"import numpy as np\r\nimport pandas as pd\r\ndata=pd.read_csv('power.csv')\r\n\r\nfrom PyEMD import CEEMDAN, Visualisation\r\nX1 = data['RealPower']\r\nt = pd.to_datetime(data['C_TIME'])\r\n\r\n#Decomposition results of RV for stock indices.\r\n\r\nceemdan = CEEMDAN()\r\nceemdan.ceemdan(X1.values.reshape(-1))\r\nimfs_close, res_close = ceemdan.get_imfs_and_residue()\r\n\r\n# vis = Visualisation()\r\n# vis.plot_imfs(imfs=imfs_close, residue=res_close, t=t, include_residue=True)\r\n# # vis.plot_instant_freq(t, imfs=imfs)\r\n# vis.show()\r\n\r\ndecompose_data = pd.DataFrame(np.vstack((imfs_close, res_close)).T,columns = ['IMF%d'%(i+1) for i in range(len(imfs_close))] + ['Res'])\r\n\r\ndecompose_data.to_csv('CEEMDAN2.csv', index=False)  # index=False\u8868\u793a\u4e0d\u4fdd\u5b58\u884c\u7d22\u5f15\r\n\r\nimport matplotlib.pyplot as plt\r\n\r\nplt.figure(figsize=(15,25))\r\n# \u7ed8\u5236IMFs\r\nfor i, imf in enumerate(imfs_close):\r\n    plt.subplot(len(imfs_close) + 1, 1, i + 1)\r\n    plt.plot(imf)\r\n    plt.text(-0.05, 0.5, f'IMF {i+1}', transform=plt.gca().transAxes, fontsize=12, va='center', ha='right')  # \u5c06\u6807\u9898\u8bbe\u7f6e\u5728\u5de6\u8fb9\r\n    plt.xticks([])\r\n\r\n# \u7ed8\u5236\u6b8b\u5dee\r\nplt.subplot(len(imfs_close) + 1, 1, len(imfs_close) + 1)\r\nplt.plot(t, res_close)\r\nplt.text(-0.15, 0.5, f'IMF {i+1}', transform=plt.gca().transAxes, fontsize=12, va='center', ha='right')  # \u5c06\u6807\u9898\u8bbe\u7f6e\u5728\u5de6\u8fb9\r\nplt.xticks(rotation=45)  # \u5c06x\u8f74\u6807\u7b7e\u65cb\u8f6c45\u5ea6\r\n\r\n# \u8bbe\u7f6e\u603b\u6807\u9898\r\nplt.suptitle('EMD Result', fontsize=16)\r\n\r\n# \u8c03\u6574\u5b50\u56fe\u95f4\u8ddd\r\n# plt.tight_layout(rect=[0, 0.03, 1, 0.95])\r\nplt.savefig(\"ceemdam.png\")\r\n# \u663e\u793a\u56fe\u8868\r\nplt.show()\n"})}),"\n",(0,s.jsxs)("center",{children:["\u6709\u610f\u601d\u7684\u662fCEEMDAN\u53ef\u4ee5\u8003\u8651\u591a\u6b21\u5206\u89e3\u6c42\u5747\u503c",(0,s.jsx)("br",{}),"\r\n",(0,s.jsx)(n.img,{alt:"\u5206\u89e3\u7ed3\u679c",src:r(3443).A+"",width:"1500",height:"2500"})]}),"\n",(0,s.jsx)(n.h4,{id:"1",children:"LSTM\u8bad\u7ec3"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-py",children:"def prepare_set(df,percentage):\r\n    train_size = int(len(df) * percentage)\r\n    train_set = df[:train_size].copy()\r\n    test_set = df[train_size:].copy()\r\n    return train_set,test_set\r\n\r\nimport torch\r\nimport torch.nn as nn\r\n\r\n#\u62df\u6839\u636e\u65b9\u5dee\u8d21\u732e\u7387\u9009\u53d6IMF5-10\u7b80\u5316\u8bad\u7ec3\u96be\u5ea6 \uff0c\u7136\u540e\u901a\u8fc7\u6743\u91cd\u8c03\u6574\u7684\u65b9\u5f0f\u9884\u6d4b\r\n\r\n# \u5b9a\u4e49LSTM\u6a21\u578b\r\nclass LSTMf(nn.Module):\r\n    def __init__(self, input_size, hidden_size, num_layers):\r\n        super(LSTMf, self).__init__()\r\n        self.hidden_size = hidden_size\r\n        self.num_layers = num_layers\r\n        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)\r\n        self.fc = nn.Linear(hidden_size, 1)  # \u9884\u6d4b\u4e0b\u4e00\u4e2a\u6570\u636e\r\n\r\n    def forward(self, x):\r\n        # \u521d\u59cb\u5316\u9690\u85cf\u72b6\u6001\u548c\u7ec6\u80de\u72b6\u6001\r\n        h0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)\r\n        c0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)\r\n        \r\n        # \u524d\u5411\u4f20\u64adLSTM\r\n        out, _ = self.lstm(x, (h0, c0))\r\n        \r\n        # \u53d6\u6700\u540e\u4e00\u4e2a\u65f6\u95f4\u6b65\u7684\u8f93\u51fa\r\n        out = out[:, -1, :]\r\n        \r\n        # \u901a\u8fc7\u5168\u8fde\u63a5\u5c42\u8fdb\u884c\u9884\u6d4b\r\n        out = self.fc(out)\r\n\r\n        return out  \r\n   \r\nimport torch.optim as optim\r\nimport pandas as pd\r\nimport matplotlib.pyplot as plt\r\n\r\nemd_data = pd.read_csv('CEEMDAN2.csv')\r\ntrain_x,test_x = prepare_set(emd_data,0.7)\r\n\r\n#IMF5-7\u590d\u6742\uff0c\u9009\u7528\u53cc\u5c42\u7684lstm\uff0c\u5176\u4ed6\u7b80\u5355\u7684\u5355\u5c42\u5c31\u597d\r\n# lstms = []\r\n# for _ in range(3):\r\n#     lstms.append(LSTMf(1,28,2))\r\n# for _ in range(3):\r\n#     lstms.append(LSTMf(1,30,1))\r\nlstm1 = LSTMf(1,32,1)\r\n\r\n# \u5b9a\u4e49\u635f\u5931\u51fd\u6570\u548c\u4f18\u5316\u5668\r\ncriterion = nn.MSELoss()  # \u5747\u65b9\u8bef\u5dee\u635f\u5931\r\noptimizer = optim.Adam(lstm1.parameters(), lr=0.003)  # Adam\u4f18\u5316\u5668\r\n\r\nbatch_size = 16\r\nepochs = 30\r\ntime_step = 10\r\niter_nums = emd_data.shape[0]//(batch_size*time_step)\r\n\r\nepoch_losses = []\r\nfor epoch in range(epochs):\r\n    epoch_loss = 0\r\n    #\u5212\u5206\u8bad\u7ec3\u6279\u6b21batch_size*time_step*input_size,\u8fd9\u91cc\u9009\u53d6\u6700\u7b80\u5355\u7684IMF10\r\n    for iter_num in range(iter_nums):\r\n        X = emd_data.iloc[iter_num*batch_size*time_step:(iter_num+1)*batch_size*time_step,9].values\r\n        Y = []\r\n        for i in range(0, time_step * batch_size, time_step):\r\n            Y.append(emd_data.iloc[iter_num*batch_size*time_step+i+time_step,9])\r\n        # print(X)\r\n        # print(Y)\r\n        Y = torch.tensor(Y,dtype=torch.float32).reshape(batch_size,1)\r\n        X = torch.tensor(X,dtype=torch.float32).reshape(batch_size,time_step,1)\r\n        output = lstm1(X)\r\n        loss = criterion(output,Y)\r\n        print(f\"epoch:{epoch+1},\u7b2c{iter_num+1}\u6279\u6b21,\u635f\u5931\u4e3a{loss}\")\r\n        epoch_loss += loss.item()\r\n        optimizer.zero_grad()  # \u6e05\u7a7a\u4e4b\u524d\u7684\u68af\u5ea6\r\n        loss.backward()  # \u53cd\u5411\u4f20\u64ad\uff0c\u8ba1\u7b97\u68af\u5ea6\r\n        optimizer.step()  # \u66f4\u65b0\u53c2\u6570\r\n    epoch_losses.append(epoch_loss / iter_nums)\r\n\r\n# \u7ed8\u5236\u635f\u5931\u66f2\u7ebf\r\nplt.plot(epoch_losses, label='Training Loss')\r\nplt.xlabel('Epoch')\r\nplt.ylabel('Loss')\r\nplt.title('Training Loss Curve')\r\nplt.legend()\r\nplt.show()\n"})}),"\n",(0,s.jsx)("center",{children:(0,s.jsx)(n.img,{alt:"\u8bad\u7ec3\u635f\u5931",src:r(4974).A+"",width:"573",height:"455"})}),"\n",(0,s.jsx)(n.p,{children:"\u6d4b\u8bd5\u9636\u6bb5"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-py",children:"print(test_x.shape)\r\n# # print(train_x.shape)\r\n# test_x.iloc[:,9]\r\n\r\ntest_len = test_x.shape[0]\r\n# print(test_x.shape)\r\n#\u4e00\u4e2a\u597d\u7684\u4e60\u60ef\u662f\u5c06\u6a21\u578b\u8bbe\u7f6e\u4e3a\u8bc4\u4f30\u6a21\u5f0f\uff0c\u5982dropout\u5728\u8bad\u7ec3\u9636\u6bb5\u4f1a\u4e22\u5f03\uff0c\u4f46\u5728\u6d4b\u8bd5\u9636\u6bb5\u4f1a\u5168\u6fc0\u6d3b\r\nlstm1.eval()\r\n\r\nhat_y = []\r\nfor i in range(test_len-time_step):\r\n    pre_x = test_x.iloc[i:i+time_step].values\r\n    pre_y = test_x.iloc[i+time_step]\r\n    pre_x = torch.tensor(pre_x,dtype=torch.float32).reshape(1,time_step,-1)\r\n    pre_y = torch.tensor([[pre_y]], dtype=torch.float32)\r\n    output = lstm1(pre_x)\r\n    hat_y.append(output.item())\r\n    import matplotlib.pyplot as plt\r\n\r\nx = [i for i in range(len(hat_y))]\r\nplt.plot(x,test_x[10:],label='origin')\r\nplt.plot(x,hat_y,label='predict')\r\nplt.legend()\r\nplt.show()\r\n\r\nimport numpy as np\r\n# \u8ba1\u7b97\u5747\u65b9\u8bef\u5dee\r\nmse = np.mean((test_x[10:] - hat_y) ** 2)\r\nprint(f'Mean Squared Error (MSE): {mse}')\r\n\r\n# \u8ba1\u7b97\u5e73\u5747\u7edd\u5bf9\u8bef\u5dee\r\nmae = np.mean(np.abs(test_x[10:] - hat_y))\r\nprint(f'Mean Absolute Error (MAE): {mae}')\r\n\r\n# \u5e73\u5747\u7edd\u5bf9\u767e\u5206\u6bd4\u8bef\u5dee\r\nmape = np.mean(np.abs((test_x[10:] - hat_y)/test_x[10:]))*100\r\nprint(f'MAPE:{mape}')\n"})}),"\n",(0,s.jsx)("center",{children:(0,s.jsx)(n.img,{src:r(7307).A+"",width:"548",height:"413"})})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},3443:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/ceemdan-7a3538be37f446b63ac6f3ab0eca3744.png"},7307:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/imf10-1f059fae8674c133e40126c360cc6262.png"},4974:(e,n,r)=>{r.d(n,{A:()=>t});const t=r.p+"assets/images/imf10loss-82c26acc3a2e3e956773f7612f484153.png"},8453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>o});var t=r(6540);const s={},i=t.createContext(s);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);