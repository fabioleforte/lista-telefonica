angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function($scope, $http) {
  $scope.app = 'Lista Telefônica ';
  $scope.contatos = [];
  $scope.operadora = [];
  $scope.message = '';

  var carregarContatos = function() {
    $http.get('http://localhost:3000/contatos').then(function(data) {
      $scope.contatos = data.data;
    });
  };
  var carregarOperadora = function() {
    $http.get('http://localhost:3000/operadora').then(function(data) {
      $scope.operadora = data.data;
    });
  };
  $scope.AdicionarContato = function(contato) {
    contato.data = new Date();
    $http
      .post('http://localhost:3000/contatos', contato)
      .then(function(data) {
        console.log(data);
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
        carregarContatos();
      })
      .catch(function(data) {
        $scope.message = 'Aconteceu um problema: ' + data.config.url;
      });
  };
  $scope.apagarContatos = function(contatos) {
    $scope.contatos = contatos.filter(function(contato) {
      if (!contato.selecionado) {
        return contato;
      }
    });
  };
  $scope.isContatosSelecionados = function(contatos) {
    return (isContatoSecionado = contatos.some(function(contato) {
      return contato.selecionado;
    }));
  };
  $scope.ordenarPor = function(campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  carregarContatos();
  carregarOperadora();
});
